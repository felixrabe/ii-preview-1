import React from 'react'
import {createSelector} from 'reselect'

import Item from '../../components/Item'

export default createSelector(
  state => state.items,
  state => state.layout,
  (items, layout) => layout.map(layoutItem => (
    <Item item={items[layoutItem.i]} key={layoutItem.i} layoutItem={layoutItem} />
  )),
)

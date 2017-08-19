import React from 'react'
import {createSelector} from 'reselect'

import Item from '../../components/Item'

export default createSelector(
  state => state.items,
  state => state.layout,
  (items, layout) => layout.map((li) => Object.assign(
    new items[li.i].constructor(),
    items[li.i],
    {name: li.i, static: li.static},
  )),
)

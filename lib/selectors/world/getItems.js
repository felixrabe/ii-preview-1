import React from 'react'
import {createSelector} from 'reselect'

import Item from '../../components/Item'
import objAssign from '../../utils/objAssign'

export default createSelector(
  state => state.items,
  state => state.layout,
  (items, layout) => layout.map((li) => objAssign(
    items[li.i],
    {name: li.i, static: li.static},
  )),
)

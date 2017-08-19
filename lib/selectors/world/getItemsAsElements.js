import React from 'react'
import {createSelector} from 'reselect'

import Item from '../../components/Item'

import getItems from './getItems'

export default createSelector(
  state => getItems(state),
  (items) => items.map(item => <Item item={item} key={item.name} />),
)

import classNames from 'classnames'
import React from 'react'
import {createSelector} from 'reselect'

const className = classNames('ii-layout-item', 'ii-layout-draggable')

export default createSelector(
  state => state.layout,
  (layout) => layout.map(item => (
    <div className={className} key={item.i} />
  )),
)

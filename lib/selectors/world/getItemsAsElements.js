import classNames from 'classnames'
import React from 'react'
import {createSelector} from 'reselect'

const innerClassName = classNames('ii-layout-item')
const outerClassName = classNames('ii-layout-item-outer', 'ii-layout-draggable')

export default createSelector(
  state => state.items, state => state.layout,
  (items, layout) => layout.map(layoutItem => (
    <div className={outerClassName} key={layoutItem.i}>
      <div className={innerClassName}>
        <div>
          {JSON.stringify(items[layoutItem.i])}
        </div>
        <div>
          {JSON.stringify(layoutItem)}
        </div>
      </div>
    </div>
  )),
)

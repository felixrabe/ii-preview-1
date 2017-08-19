import classNames from 'classnames'
import _ from 'lodash'
import React from 'react'

const innerClassName = classNames('ii-layout-item-inner')
const outerClassName = classNames('ii-layout-item-outer', 'ii-layout-draggable')

export default class Item extends React.Component {
  render() {
    const props = _.omit(this.props, 'item', 'layoutItem')
    return (
      <div {...props} className={outerClassName}>
        <div className={innerClassName}>
          <div>
            {JSON.stringify(this.props.item)}
          </div>
          <div>
            {JSON.stringify(this.props.layoutItem)}
          </div>
        </div>
        {props.children}
      </div>
    )
  }
}


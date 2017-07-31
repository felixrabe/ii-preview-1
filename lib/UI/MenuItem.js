import Area from './Area'
import React from 'react'

import './MenuItem.css'

export default class MenuItem extends React.Component {
  handleKeyPress = (e) => {
    if (!this.props.onClick) {
      return
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      this.props.onClick()
    }
  }

  render() {
    let tabProps = {}
    if (!this.props.disableTab) {
      tabProps = {
        onKeyPress: this.handleKeyPress,
        role: 'button',
        tabIndex: 0,
      }
    }

    return (
      <Area {...this.props} omit='disableTab'>
        <div className='ui-menu-item' {...tabProps}>
          {this.props.children}
        </div>
      </Area>
    )
  }
}

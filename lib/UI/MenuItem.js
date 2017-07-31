import ProcessColors from './ProcessColors'
import ProcessDisabled from './ProcessDisabled'
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
        tabIndex: 0,
        role: 'button',
        onKeyPress: this.handleKeyPress,
      }
    }

    return (
      <ProcessDisabled {...this.props} omit='disableTab'>
        <ProcessColors>
          <div className='ui-area ui-menu-item' {...tabProps}>
            {this.props.children}
          </div>
        </ProcessColors>
      </ProcessDisabled>
    )
  }
}

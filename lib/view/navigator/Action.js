import React from 'react'

import {
  cl,
} from './Utils.js'

export default class Action extends React.Component {
  render() {
    if (typeof this.props.if === 'undefined' || this.props.if) {
      return (
        <span {...cl('navitem', 'action')} onClick={this.props.onClick}>
          {this.props.children}
        </span>
      )
    } else {
      return null
    }
  }
}

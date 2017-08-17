import React from 'react'

import Action from './Action'

export default class ActionRevert extends React.Component {
  onClickRevert = async () => {
    this.props.revert()
  }

  render() {
    return (
      <Action if={this.props.modified} onClick={this.onClickRevert}>
        revert
      </Action>
    )
  }
}

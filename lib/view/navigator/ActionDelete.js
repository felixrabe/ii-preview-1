import React from 'react'

import Action from './Action'

export default class ActionRevert extends React.Component {
  onClickDelete = async () => {
    await this.props.delete()
    this.props.goTo('..')
  }

  render() {
    return (
      <Action if={this.props.hasData} onClick={this.onClickDelete}>
        delete
      </Action>
    )
  }
}

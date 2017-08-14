import React from 'react'

import Action from './Action'

export default class ActionToString extends React.Component {
  onClickToString = async () => {
    const text = this.props.getEditorStateText()
    await this.props.saveData(text)
  }

  render() {
    return (
      <Action if={this.props.isJSON} onClick={this.onClickToString}>
        to string
      </Action>
    )
  }
}

import React from 'react'

import Action from './Action'

export default class ActionToJSON extends React.Component {
  onClickToJSON = async () => {
    const text = this.props.getEditorStateText()
    try {
      const data = JSON.parse(text)
      await this.props.saveData(data)
    } catch (err) {
      alert(err)
      return
    }
  }

  render() {
    return (
      <Action if={this.props.isString} onClick={this.onClickToJSON}>
        to JSON
      </Action>
    )
  }
}

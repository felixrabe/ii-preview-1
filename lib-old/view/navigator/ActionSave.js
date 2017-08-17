import React from 'react'

import Action from './Action'

export default class ActionSave extends React.Component {
  onClickSave = async () => {
    const text = this.props.getEditorStateText()
    let data = text
    if (this.props.getDataType().pop() !== 'string') {
      try {
        data = JSON.parse(text)
      } catch (err) {
        alert(err)
        return
      }
    }

    await this.props.saveData(data)
  }

  render() {
    return (
      <Action if={this.props.modified} onClick={this.onClickSave}>
        save
      </Action>
    )
  }
}

import React from 'react'

import Action from './Action'

export default class ActionAddData extends React.Component {
  onClickAddData = async () => {
    await this.props.saveData('')
  }

  render() {
    return (
      <Action if={!this.props.hasData} onClick={this.onClickAddData}>
        add data
      </Action>
    )
  }
}

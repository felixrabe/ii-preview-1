import React from 'react'

import Action from './Action'

export default class ActionNew extends React.Component {
  onClickNew = async () => {
    const name = prompt('Enter a name')
    if (name === null || name === '') {
      return
    }

    this.props.goTo(name)
    await this.props.saveData('')
  }

  render() {
    return <Action onClick={this.onClickNew}>new</Action>
  }
}

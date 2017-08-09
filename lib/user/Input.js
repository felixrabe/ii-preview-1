import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  render() {
    return (
      <input
        onChange={i => this.setState({input: i.target.value})}
        value={this.state.input}
      />
    )
  }
}

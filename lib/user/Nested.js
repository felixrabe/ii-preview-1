import React from 'react'

class Inner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  componentWillMount() {
    console.log('Inner.componentWillMount')
  }

  componentDidMount() {
    console.log('Inner.componentDidMount')
  }

  componentWillUnmount() {
    console.log('Inner.componentWillUnmount')
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

let innerState = {}

export default class Nested extends React.Component {
  componentWillMount() {
    console.log('Nested.componentWillMount')
  }

  componentDidMount() {
    console.log('Nested.componentDidMount')
    this.inner.setState(innerState)
  }

  componentWillUnmount() {
    console.log('Nested.componentWillUnmount')
    innerState = this.inner.state
  }

  render() {
    return <Inner ref={r => this.inner = r} />
  }
}

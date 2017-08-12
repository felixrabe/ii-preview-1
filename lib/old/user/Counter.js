import React from 'react'

export default class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(this.increment, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  increment = () => {
    console.log('increment')
    this.setState(prevState => ({counter: prevState.counter + 1}))
  }

  render() {
    return (
      <div className='idev-padding'>
        {this.state.counter}
      </div>
    )
  }
}

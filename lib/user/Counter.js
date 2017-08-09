import React from 'react'
import PropTypes from 'prop-types'

export default class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true

    this.context.storage.getItem('counter').then(c => {
      this.setState({counter: c})
      this.intervalID = setInterval(this.increment, 1000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
    this.context.storage.setItem('counter', this.state.counter)
    this._isMounted = false
  }

  increment = () => {
    console.log('increment')
    this.setState(prevState => ({counter: prevState.counter + 1}))
  }

  render() {
    return (
      <div className='core-padding'>
        {this.state.counter}
      </div>
    )
  }
}

Counter.contextTypes = {
  storage: PropTypes.object.isRequired,
}

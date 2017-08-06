import React from 'react'
import PropTypes from 'prop-types'

export default class Live extends React.Component {
  static propTypes = {
    dir: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = Object.assign({
      counter: 0,
      isInTick: false,
    }, this.stateFromProps(props))
  }

  componentDidMount() {
    this.tick()
  }

  stateFromProps = (props_) => {
    // eslint-disable-next-line no-unused-vars
    const {name, dir, children, ...props} = props_
    this.state && this.state.name && dir.delete(this.state.name)
    const newState = {
      dir: dir,
      import: props.import,
      name: name || props.import.toLowerCase(),
    }
    delete props.import
    newState.props = props
    return newState
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => this.stateFromProps(nextProps))
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
    delete this.timeout
  }

  tick = async () => {
    this.setState(prevState => ({counter: prevState.counter + 1}))

    this.setState({isInTick: true})
    const state = this.state
    const dir = state.dir
    await dir.get('app').reloadStyle()
    const Cls = await dir.import(state.import)
    dir.set(state.name, React.createElement(Cls, state.props))
    this.setState({isInTick: false})

    this.timeout = setTimeout(this.tick, 1500)
  }

  render() {
    const propKeys = Object.keys(this.state.props).sort().join(' ')
    return (
      <div className='user-live'>
        {this.state.name} =
        {`<${this.state.import} ${propKeys}>`} ...
        {this.state.isInTick && 'tick' || ''}
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../Loading'
import View from '../View'

export default class MultiView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      config: this.props.config,
      data: <Loading />,
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this.update()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.config === nextProps.config) {
      return
    }

    this.setState({
      config: nextProps.config,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.config === this.state.config) {
      return
    }

    this.setState({data: <Loading />})
    this.update()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async update() {
    const data = this.state.config.children.map((c, i) => (
      <View key={i} path={c} />
    ))
    this.setState({data})
  }

  render() {
    return (
      <div style={this.state.config.style}>
        {this.state.data}
      </div>
    )
  }
}

MultiView.contextTypes = {
  store: PropTypes.object.isRequired,
}

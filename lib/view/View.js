import React from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import UndefinedView from './undefined/View'

export default class View extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      path: this.props.path,
      view: <Loading />,
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this.updateView()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path === nextProps.path) {
      return
    }

    this.setState({
      path: nextProps.path,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.path === this.state.path) {
      return
    }

    this.setState({view: <Loading />})
    this.updateView()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // eslint-disable-next-line max-statements
  async updateView() {
    let viewConfig = await this.context.dataAccess.get(this.state.path)
    viewConfig = Object.assign({}, viewConfig)
    const {ii_type} = viewConfig
    delete viewConfig.ii_type
    let View = undefined

    if (typeof ii_type !== 'undefined') {
      const mod = await this.context.dataAccess.get(ii_type)
      View = mod && mod.default
    }

    if (!View) {
      View = UndefinedView
    }

    if (!this._isMounted) {
      return
    }

    this.setState({view: <View config={viewConfig} />})
  }

  render() {
    return this.state.view
  }
}

View.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}

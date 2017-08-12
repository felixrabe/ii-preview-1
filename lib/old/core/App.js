import React from 'react'
import PropTypes from 'prop-types'

import {style} from './ui/style/CSS'
import AsyncStorage from './storage/AsyncStorage'
import Scope from './Scope'
import Layout from './Layout'

import CommandLine from './cmd/CommandLine'
import CommandRunner from './cmd/CommandRunner'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.storage = new AsyncStorage(localStorage, '$$instadev$$')

    this.state = {
      canAnimate: false,
      scope: new Scope({
        onChange: this.onScopeChange,
        storage: this.storage,
      }),
      style: style,
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    setTimeout(() => this.setState({canAnimate: true}), 500)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getChildContext() {
    return { storage: this.storage }
  }

  onScopeChange = (scope) => {
    if (!this._isMounted) {
      return
    }

    this.setState({scope})
    return
  }

  _reactRepr = () => (
    <div className='idev-padding idev-repr'>Main application object</div>
  )

  refLayout = (layout) => {
    // this.state.scope.set('layout', layout, {constant: true, hidden: true})
  }

  reloadStyle = async () => {
    const newStyle = await this.state.scope._import('lib/ui/style/CSS', 'style')
    this.setState({style: newStyle})
  }

  render() {
    const addClassName = this.state.canAnimate ? '' : ' idev-animate-none'
    return (
      <div className={`idev-app${addClassName}`}>
        <style>{this.state.style}</style>
        <Layout
          layout={this.state.scope.getLayout()}
          onLayoutChange={this.state.scope.onLayoutChange}
          ref={this.refLayout}
        >
          {this.state.scope.renderObjsForLayout()}
        </Layout>
      </div>
    )
  }
}

App.childContextTypes = {
  storage: PropTypes.object.isRequired,
}

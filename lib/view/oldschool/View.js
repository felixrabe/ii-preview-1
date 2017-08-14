import React from 'react'
import PropTypes from 'prop-types'

import {style} from './StyleCSS'
import Storage from './Storage'
import Scope from './Scope'
import Layout from './Layout'

export default class OldSchoolView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      canAnimate: false,
    }

    this._isMounted = false
  }

  componentWillMount() {
    this.storage = new Storage(
      this.context.dataAccess,
      this.props.config.storage,
    )

    this.setState({
      scope: new Scope({
        onChange: this.onScopeChange,
        storage: this.storage,
      }),
    })
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

  refLayout = (layout) => {  // eslint-disable-line no-unused-vars
    // this.state.scope.set('layout', layout, {constant: true, hidden: true})
  }

  render() {
    const addClassName = this.state.canAnimate ? '' : ' idev-animate-none'
    return (
      <div className={`idev-app${addClassName}`}>
        <style>{style}</style>
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

OldSchoolView.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}

OldSchoolView.childContextTypes = {
  storage: PropTypes.object.isRequired,
}

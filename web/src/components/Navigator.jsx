import classNames from 'classnames'
import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import actions from '../actions/index'
import autokey from './autokey.jsx'
import {styleCSS} from './NavigatorStyle.jsx'

const connector = connect(
  (state, ownProps) => ({
    content: (state.pathData[ownProps.location.pathname] || {}).data,
    loading: {true: 'loading...', false: 'ready!'}[state.isLoading],
  }),
  (dispatch, ownProps) => ({
    loadPath: (path) => dispatch(actions.loadPath(path))
  }),
)

const Path = connector(({location}) => (
  <div>
    <Link to='/'>{location.pathname}</Link>
  </div>
))

class Content_ extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.update(nextProps)
    }
  }

  update(props) {
    this.props.loadPath(props.location.pathname)
  }

  render() {
    const {content, location} = this.props
    return (
      <div>
        {(content || []).map(c => (
          <div key={c}>
            <Link to={
              location.pathname + (location.pathname === '/' ? '' : '/') + c
            }>{c}</Link>
          </div>
        ))}
      </div>
    )
  }
}

const Content = connector(Content_)

class Navigator extends React.Component {
  render() {
    const className = classNames(
      'ii-navigator',
    )
    return autokey([
      <style>{styleCSS}</style>,
      <div className={className}>
        <Route component={Path} />
        <Route component={Content} />
      </div>,
    ])
  }
}

export const __useDefault = Navigator
export default __useDefault

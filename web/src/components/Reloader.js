import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import actions from '../actions/index'
import autokey from './autokey'

class Reloader extends React.Component {
  constructor(props) {
    super(props)

    this.reloadPromise = new Promise((res, rej) => {
      this.reloadPromiseResolve = res
      this.reloadPromiseReject = rej
    })
  }

  async componentDidMount() {  // client-only
    try {
      this.reloadPromiseResolve(
        await SystemJS.import('../core-client/reload', __moduleName)
      )
    } catch (err) {
      this.reloadPromiseReject(err)
    }
  }

  render() {
    const className = classNames(
      'ii-reloader',
    )
    return autokey([
      // <style>{styleCSS}</style>,
      <div className={className}>
        <a href='#' onClick={e => {
          e.preventDefault()
          this.props.reload()
          this.reloadPromise.then(reload => reload())
        }}>
          Reload
        </a>
      </div>,
    ])
  }
}

const connector = connect(
  (state) => ({}),
  (dispatch) => ({
    reload: () => {
      dispatch(actions.setIsLoading(true))
    },
  }),
)

export const __useDefault = connector(Reloader)
export default __useDefault

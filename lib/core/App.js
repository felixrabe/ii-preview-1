import PropTypes from 'prop-types'
import React from 'react'

import Loading from './Loading'
import Store from '../store/Store'
import SourceLocal from '../store/SourceLocal'

window.thenlet = (n, x) => (x.then(y => window[n] = y), undefined)
window.thenlog = (x) => (x.then(y => console.log(y)), undefined)

const store = new Store({
  init: new SourceJSON({

  }),
  local: new SourceLocal({prefix: 'ii-'}),
})

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  getChildContext() {
    return { store }
  }

  render() {
    return (
      <div className='ii-app' style={{height: '100%'}}>
        <style>{'html { font-size: 16px; }'}</style>
      </div>
    )
  }
}

App.childContextTypes = {
  store: PropTypes.object.isRequired,
}

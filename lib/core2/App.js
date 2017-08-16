import React from 'react'
import PropTypes from 'prop-types'

import SourceJS from '../store2/SourceJS'
import SourceStorage from '../store2/SourceStorage'
import Store from '../store2/Store'

const store = new Store(new SourceJS({
  local: new SourceStorage(localStorage, 'ii'),
}))

const Loading = (props) => props.if ? <em>Loading...</em> : props.children

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  async componentWillMount() {
    this.setState({isLoading: true})
    this.setState({hello: await store.get('local/hello') || '', isLoading: false})
  }

  componentDidMount() {
    store.subscribe('local/hello', (mName, path, aa) => {
      if (mName === 'set') {
        this.setState({hello: aa[0]})
      }
    })
  }

  getChildContext() {
    return { store }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <style>{'html { font-size: 16px; }'}</style>
        <Loading if={this.state.isLoading}>
          <input value={this.state.hello} onChange={e => store.set('local/hello', e.target.value)} />
        </Loading>
      </div>
    )
  }
}

App.childContextTypes = {
  store: PropTypes.object,
}

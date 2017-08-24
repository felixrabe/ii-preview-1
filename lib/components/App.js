import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'

import {styleCSS} from './Style'

class App extends React.Component {
  state = {url: 'https://api.github.com/repos/gaearon/redux-thunk'}

  render = () => (
    <div className='ii-app'>
      <style>{styleCSS}</style>
      <input value={this.state.url} onChange={ev => this.setState({url: ev.target.value})} />
      <button onClick={() => this.props.onFetch(this.state.url)}>Fetch</button>
      <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
    </div>
  )
}

export default connect(
  (state) => ({
    state,
  }),
  (dispatch) => ({
    onFetch: (url) => dispatch(actions.fetchUrl(url)),
  }),
)(App)

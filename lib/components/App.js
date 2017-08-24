import React from 'react'
import {connect} from 'react-redux'

import {styleCSS} from './Style'

const App = ({state}) => (
  <div className='ii-app'>
    <style>{styleCSS}</style>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
)

export default connect(
  (state) => ({state}),
)(App)

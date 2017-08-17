import React from 'react'

import {styleCSS} from './AppStyle'
import Data from './Data'
import Dir from './Dir'
import Path from './Path'

const App = () => (
  <div className='ii-app'>
    <style>{styleCSS}</style>
    <div className='ii-top'>
      <Path />
      {' — '}
      <Dir />
    </div>
    <Data />
  </div>
)

export default App

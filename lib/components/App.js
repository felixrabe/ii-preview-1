import React from 'react'

import {styleCSS} from './AppStyle'
import Data from './Data'
import Dir from './Dir'
import Path from './Path'

const App = () => (
  <div className='ii-app'>
    <style>{styleCSS}</style>
    <Path />
    <Dir />
    <Data />
  </div>
)

export default App

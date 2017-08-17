import React from 'react'

import Data from './Data'
import Path from './Path'

const styleCSS = `
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #root {
    height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    margin: 0px;
    overflow: hidden;
    padding: 0px;
  }
`

const App = () => (
  <div>
    <style>{styleCSS}</style>
    <Path />
    <Data />
  </div>
)

export default App

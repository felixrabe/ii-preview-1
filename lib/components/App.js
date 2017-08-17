import React from 'react'

import Input from './Input'
import Output from './Output'
import Transform from './Transform'

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
    <Input />
    <Transform />
    <Output />
  </div>
)

export default App

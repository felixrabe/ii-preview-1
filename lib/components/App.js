import React from 'react'

import Navigator from './Navigator'

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
    <Navigator />
  </div>
)

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import App from './old/App'

import './index.css'

export let app

export function _run() {
  ReactDOM.render(<App ref={a => app = a} />, document.getElementById('root'))
}

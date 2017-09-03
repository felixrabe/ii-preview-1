import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Body from '../components/Body.jsx'
import extendPromise from './dev-utils/js/extendPromise'
import extendSystemJS from './dev-utils/js/extendSystemJS'

const main = async () => {
  extendPromise(Promise)
  extendSystemJS(SystemJS)  // IILoader

  const iiRoot = document.getElementById('ii-root')
  ReactDOM.hydrate(<BrowserRouter><Body loading /></BrowserRouter>, iiRoot)
  ReactDOM.render(<BrowserRouter><Body /></BrowserRouter>, iiRoot)

  document.body.classList.remove('loading')
  console.log('ii ready')
}

export const __useDefault = main
export default __useDefault

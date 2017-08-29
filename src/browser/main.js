import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

import extendPromise from '../devUtils/js/extendPromise'
import extendSystemJS from '../devUtils/js/extendSystemJS'
import AppRoot from '../server/reactComponents/AppRoot'
import IIRoot from '../server/reactComponents/IIRoot'

import AppLoader from './AppLoader'

const IILoader = SystemJS

const main = () => {
  extendPromise(Promise)

  extendSystemJS(AppLoader)
  extendSystemJS(IILoader)

  ReactDOM.hydrate((
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  ), document.getElementById('app-root'))

  ReactDOM.hydrate((
    <MemoryRouter>
      <IIRoot />
    </MemoryRouter>
  ), document.getElementById('ii-root'))

  console.log('ii ready')
}

export const __useDefault = main
export default __useDefault

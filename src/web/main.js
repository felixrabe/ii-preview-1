import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

import extendPromise from '../devUtils/js/extendPromise'
import extendSystemJS from '../devUtils/js/extendSystemJS'
import AppRoot from './components/AppRoot'
import IIRoot from './components/IIRoot'

import AppLoader from './AppLoader'

const IILoader = SystemJS

const main = async () => {
  extendPromise(Promise)

  extendSystemJS(AppLoader)
  extendSystemJS(IILoader)

  ReactDOM.hydrate((
    <MemoryRouter>
      <IIRoot />
    </MemoryRouter>
  ), document.getElementById('ii-root'))

  console.log('ii ready')

  ReactDOM.hydrate((
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  ), document.getElementById('app-root'))

  await AppLoader._configured
  const AppRoot2 = await AppLoader.import('app/AppRoot')

  ReactDOM.render((
    <BrowserRouter>
      <AppRoot2 />
    </BrowserRouter>
  ), document.getElementById('app-root'))

  console.log('app ready')
}

export const __useDefault = main
export default __useDefault

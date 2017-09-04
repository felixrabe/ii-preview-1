import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import actions from '../actions/index'
import Body from '../components/Body.jsx'
import store from '../store'
import extendPromise from './dev-utils/js/extendPromise'
import extendSystemJS from './dev-utils/js/extendSystemJS'

const main = async () => {
  extendPromise(Promise)
  extendSystemJS(SystemJS)  // IILoader

  SystemJS.import('../actions/index', __moduleName).let('actions')
  SystemJS.import('../store', __moduleName).let('store')

  const iiElem =
    <Provider store={store}>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </Provider>
  const iiRoot = document.getElementById('ii-root')

  ReactDOM.hydrate(iiElem, iiRoot)
  store.dispatch(actions.setEnv({inBrowser: true, inNode: false}))
  ReactDOM.render(iiElem, iiRoot)

  store.subscribe(() => {
    document.body.classList.toggle('loading', store.getState().isLoading)
  })
  store.dispatch(actions.setIsLoading(false))
  console.log('ii ready')
}

export const __useDefault = main
export default __useDefault

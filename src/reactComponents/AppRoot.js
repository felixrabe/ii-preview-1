import React from 'react'
import { Route } from 'react-router-dom'

const App = () => (
  <div>
    App
  </div>
)

const AppRoot = () => (
  <Route path="/:path*" component={App}/>
)

export const __useDefault = AppRoot
export default __useDefault

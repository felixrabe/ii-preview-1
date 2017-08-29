import React from 'react'
import { Link, Route } from 'react-router-dom'

const App = ({match}) => (
  <div>
    App (/{match.params.path}) {' '}
    <Link to='/'>Tutorial</Link> {' '}
    <Link to='/docs'>Docs</Link> {' '}
    <Link to='/foo/bar'>Foo Bar</Link>
  </div>
)

const AppRoot = () => (
  <Route path="/:path*" component={App}/>
)

export const __useDefault = AppRoot
export default __useDefault

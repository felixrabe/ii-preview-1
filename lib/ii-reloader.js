import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

export const Placeholder = ({match}) => (
  <div>
    Placeholder (/{match.params.path}) {' '}
    <Link to='/'>Tutorial</Link> {' '}
    <Link to='/docs'>Docs</Link> {' '}
    <Link to='/foo/bar'>Foo Bar</Link>
  </div>
)

export const render = () => {
  ReactDOM.hydrate((
    <Router>
      <Route path="/:path*" component={Placeholder}/>
    </Router>
  ), document.getElementById('app-root'))
}

export const reload = async () => {
  const Loader = self.Loader = new SystemJS.constructor()
  await Loader.import('jspm.config.js')
  Loader.import('/pages/intro.js')
}

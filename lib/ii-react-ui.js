import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route, MemoryRouter as Router } from 'react-router-dom'

const Tutorial = () => <h1>Tutorial</h1>

const Docs = () => <h1>Docs</h1>

const autokey = (children) => children.map((c, i) =>
  React.cloneElement(c, {key: i})
)

export const II = () => autokey([
  <ul>
    <li><Link to='/'>Tutorial</Link></li>
    <li><Link to='/docs'>Docs</Link></li>
  </ul>,
  <hr />,
  <Route exact path='/' component={Tutorial} />,
  <Route path='/docs' component={Docs} />,
])

export const render = () => {
  ReactDOM.hydrate((
    <Router>
      <II />
    </Router>
  ), document.getElementById('ii-root'))
}

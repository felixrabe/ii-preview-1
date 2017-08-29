import React from 'react'
import { Link, Route } from 'react-router-dom'

import autokey from '../reactUtils/autokey'

const Docs = () => <h1>Docs</h1>
const Tutorial = () => <h1>Tutorial</h1>

const IIRoot = () => autokey([
  <ul>
    <li><Link to='/'>Tutorial</Link></li>
    <li><Link to='/docs'>Docs</Link></li>
  </ul>,
  <hr />,
  <Route exact path='/' component={Tutorial} />,
  <Route path='/docs' component={Docs} />,
])

export const __useDefault = IIRoot
export default __useDefault

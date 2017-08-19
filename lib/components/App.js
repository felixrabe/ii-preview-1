import React from 'react'

import Layout from './Layout'
import {styleCSS} from './Style'

export default () => (
  <div className='ii-app'>
    <style>{styleCSS}</style>
    <Layout />
  </div>
)

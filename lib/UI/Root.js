import ProcessFlags from './ProcessFlags'
import React from 'react'

import './Root.css'

export default (props) => (
  <ProcessFlags {...props}>
    <div className='ui-root'>
      {props.children}
    </div>
  </ProcessFlags>
)

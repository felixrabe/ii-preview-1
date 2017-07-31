import ProcessFlags from './ProcessFlags'
import React from 'react'

import './Body.css'

export default (props) => (
  <ProcessFlags {...props}>
    <div className='ui-body'>
      {props.children}
    </div>
  </ProcessFlags>
)

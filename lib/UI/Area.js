import React from 'react'

import './Area.css'

export default (props) => (
  <div className='ui-area' onClick={props.onClick}>
    {props.children}
  </div>
)

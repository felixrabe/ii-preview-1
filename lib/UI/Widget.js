// DEPRECATED

import React from 'react'

import './Widget.css'

export default (props) => (
  <div className='ui-area ui-widget'
    style={{height: props.height + 'px'}}
    onClick={props.onClick}>
    {props.children}
  </div>
)

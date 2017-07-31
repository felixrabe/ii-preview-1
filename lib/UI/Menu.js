import ProcessDisabled from './ProcessDisabled'
import React from 'react'

import './Menu.css'

export default (props) => (
  <ProcessDisabled {...props}>
    <div className='ui-menu'>
      {props.children}
    </div>
  </ProcessDisabled>
)

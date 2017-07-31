import ProcessColors from './ProcessColors'
import ProcessDisabled from './ProcessDisabled'
import React from 'react'

import './Area.css'

export default (props) => (
  <ProcessDisabled {...props}>
    <ProcessColors className='ui-area'>
      {props.children}
    </ProcessColors>
  </ProcessDisabled>
)

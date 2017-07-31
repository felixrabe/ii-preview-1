import React from 'react'

import './Root.css'

export default (props) => (
  <div className={'ui-root ' + props.className}>
    {props.children}
  </div>
)

import React from 'react'

import 'font-awesome/css/font-awesome.css'

const icon = (name) => (
  (props) => <span {...props}><i className={`fa fa-${name}`} /></span>
)

const Icon = {
  WindowClose: icon('window-close'),
}

export {Icon as default}

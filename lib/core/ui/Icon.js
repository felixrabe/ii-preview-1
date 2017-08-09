import React from 'react'

import 'font-awesome/css/font-awesome.css'

const icon = (name) => (
  (props) => <span {...props}><i className={`fa fa-${name}`} /></span>
)

const Icon = {
  Remove: icon('times-circle'),
}

export {Icon as default}

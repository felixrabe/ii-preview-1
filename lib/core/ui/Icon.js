import React from 'react'

import 'font-awesome/css/font-awesome.css'

const Icon = Object.assign(
  class Icon extends React.Component {
    render() {
      const {name, ...props} = this.props
      return <span {...props}><i className={`fa fa-${name}`} /></span>
    }
  },
  {
    Hide: (props) => <Icon name='eye-slash' />,
    Remove: (props) => <Icon name='times-circle' />,
  },
)

export {Icon as default}

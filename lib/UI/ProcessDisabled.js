import ProcessFlags from './ProcessFlags'

import './ProcessDisabled.css'

export default (props) => {
  return ProcessFlags(props, {disabled: 'ui-disabled'})
}

// // Old version:

// import React from 'react'

// import './ProcessDisabled.css'

// export default (props) => {
//   const child = React.Children.only(props.children)

//   const newProps = Object.assign({}, props)
//   newProps.className = ([
//     props.className,
//     props.disabled ? 'ui-disabled' : '',
//     child.props.className,
//   ]).join(' ');
//   ('children disabled omit ' + props.omit).trim().split(/\s+/)
//     .forEach(k => {
//       delete newProps[k]
//     })

//   return React.cloneElement(child, newProps)
// }

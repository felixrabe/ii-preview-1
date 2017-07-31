import React from 'react'

export default (props, flags) => {
  flags = (typeof flags !== 'undefined' ? flags : props.flags)
  const child = React.Children.only(props.children)

  const newProps = Object.assign({}, props)

  newProps.className = [].concat(
    props.className,
    Object.keys(flags).map(flag => props[flag] ? flags[flag] : ''),
    child.props.className,
  ).join(' ').trim().replace(/\s+/g, ' ');

  ['children', 'omit'].concat(
    ('' + props.omit).trim().split(/\s+/),
    Object.keys(flags),
  ).forEach(k => delete newProps[k])

  return React.cloneElement(child, newProps)
}

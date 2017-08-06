import React from 'react'

import {repr} from './ReprJS'

const getType = (o) => {
  let t = typeof o
  switch (t) {
  case 'object':
    if (Array.isArray(o)) {
      return 'array'
    }

    break
  }

  return t
}

const represent = (o) => {
  const t = getType(o)
  switch (t) {
  case 'array':
  case 'number':
  case 'string':
    return repr(o)
  default:
    return <em>Opaque {t}</em>
  }
}

export default class Repr extends React.Component {
  render() {
    return <div>{represent(this.props.children)}</div>
  }
}

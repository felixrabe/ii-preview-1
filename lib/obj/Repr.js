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
  if (['array', 'boolean', 'function', 'number', 'string'].includes(t)) {
    return repr(o)
  } else {
    return <em>Opaque {t}</em>
  }
}

export default class Repr extends React.Component {
  render() {
    return <div className='repr'>{represent(this.props.children)}</div>
  }
}

import React from 'react'

const getType = (o) => {
  let t = typeof o
  switch (t) {
  default:
    break
  }

  return t
}

export default class Repr extends React.Component {
  render() {
    const o = this.props.children
    const t = getType(o)
    switch (t) {
    case 'number':
    case 'string':
      return <div>{o}</div>
    default:
      return <div><em>Opaque {t}</em></div>
    }
  }
}

import React from 'react'

const autokey = (children) => children.map((c, i) =>
  React.cloneElement(c, {key: i})
)

export const __useDefault = autokey
export default __useDefault

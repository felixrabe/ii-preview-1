import classNames from 'classnames'
import React from 'react'

import autokey from './autokey.jsx'
import {styleCSS} from './BodyStyle.jsx'
import Navigator from './Navigator.jsx'

class Body extends React.Component {
  render() {
    const className = classNames(
      'ii-body',
    )
    return autokey([
      <style>{styleCSS}</style>,
      <div className={className}>
        <Navigator />
      </div>,
    ])
  }
}

export const __useDefault = Body
export default __useDefault

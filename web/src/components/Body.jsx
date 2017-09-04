import classNames from 'classnames'
import React from 'react'

import AceSafelyWrapped from './AceSafelyWrapped.jsx'
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
        <AceSafelyWrapped />
      </div>,
    ])
  }
}

export const __useDefault = Body
export default __useDefault

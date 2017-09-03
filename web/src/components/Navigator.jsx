import classNames from 'classnames'
import React from 'react'

import autokey from './autokey.jsx'
import {styleCSS} from './NavigatorStyle.jsx'

class Navigator extends React.Component {
  render() {
    const className = classNames(
      'ii-navigator',
    )
    return autokey([
      <style>{styleCSS}</style>,
      <div className={className}>
        Navigator
      </div>,
    ])
  }
}

export const __useDefault = Navigator
export default __useDefault

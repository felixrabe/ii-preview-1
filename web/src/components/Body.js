import classNames from 'classnames'
import React from 'react'

import AceSafelyWrapped from './AceSafelyWrapped'
import autokey from './autokey'
import {styleCSS} from './BodyStyle'
import Navigator from './Navigator'
import Reloader from './Reloader'

class Body extends React.Component {
  render() {
    const className = classNames(
      'ii-body',
    )
    return autokey([
      <style>{styleCSS}</style>,
      <div className={className}>
        <Reloader />
        <div>
          Between 7
        </div>
        <Navigator />
      </div>,
    ])
  }
}

export const __useDefault = Body
export default __useDefault

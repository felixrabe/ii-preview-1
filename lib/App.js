import React from 'react'

import {style} from './Style'
import Dir from './Dir'
import Obj from './GridLayoutObj'
import {later} from './Util'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this._isDirInitialized = false
  }

  setDirRef = (dir) => {
    this.initializeDir(dir)
    this.setState({dir: dir})
  }

  initializeDir = (dir) => {
    if (this._isDirInitialized) {
      return
    }

    this._isDirInitialized = true
    dir.set('one', 1)
    dir.set('two', 2)
    later(() => dir.set('three', 3))
    later(() => dir.set('self', dir))
    later(() => dir.set('one', 11))
    later(() => dir.delete('two'))
    later(() => dir.set('four', 4))
  }

  render() {
    return (
      <div className='app frame'>
        <style>{style}</style>
        <Dir ref={this.setDirRef} Obj={Obj}>
          <div className='grid-layout frame' />
        </Dir>
      </div>
    )
  }
}

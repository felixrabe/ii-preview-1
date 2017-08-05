import React from 'react'

import {style} from './Style'
import Dir from './Dir'
import GridLayout from './GridLayout'
import Obj from './GridLayoutObj'

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

    dir.set('self', dir, {canDelete: false})
  }

  render() {
    return (
      <div className='app'>
        <style>{style}</style>
        <Dir ref={this.setDirRef} Obj={Obj}>
          <GridLayout />
        </Dir>
      </div>
    )
  }
}

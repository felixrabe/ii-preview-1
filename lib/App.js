import React from 'react'

import {style} from './Style'
import Dir from './Dir'
import ColorPalette from './ColorPalette'
import CommandRunner from './CommandRunner'
import CommandLine from './CommandLine'
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

    const runner = new CommandRunner(dir)

    dir.set('dir', dir, {canDelete: false, x: 0})
    dir.set('React', React, {canDelete: false, x: 4})
    dir.set('palette', <ColorPalette />, {x: 8})
    setTimeout(() => dir.set('cmdLine', <CommandLine onReturn={runner.run} />, {w: 12}), 100)
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

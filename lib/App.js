import React from 'react'

import {style} from './StyleCSS'
import Dir from './Dir'
import ColorPalette from './ColorPalette'
import CommandRunner from './CommandRunner'
import CommandLine from './CommandLine'
import GridLayout from './GridLayout'
import GridLayoutObj from './GridLayoutObj'

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
    const cmdLine = <CommandLine onReturn={runner.run} />

    dir.set('dir', dir, {canDelete: false, x: 0, w: 2, h: 5})
    dir.set('React', React, {canDelete: false, x: 10, w: 2, h: 2})
    dir.set('palette', <ColorPalette />, {x: 10, w: 2})
    setTimeout(() => dir.set('cmdLine', cmdLine, {x: 2, w: 8, h: 2}), 100)
  }

  render() {
    return (
      <div className='app'>
        <style>{style}</style>
        <Dir ref={this.setDirRef} Obj={GridLayoutObj}>
          <GridLayout />
        </Dir>
      </div>
    )
  }
}

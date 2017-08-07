import React from 'react'
import PropTypes from 'prop-types'

import {style} from './StyleCSS'
import Dir from './Dir'
import CommandRunner from './CommandRunner'
import CommandLine from './CommandLine'
import GridLayout from './GridLayout'
import GridLayoutObj from './GridLayoutObj'
import AsyncStorage from './AsyncStorage'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dir: null,
      style: style,
    }

    this.storage = new AsyncStorage(localStorage, '$$instadev$$')

    this._isDirInitialized = false
  }

  getChildContext = () => {
    return { storage: this.storage }
  }

  reloadStyle = async () => {
    await this.state.dir.import('lib/core/StyleVars')
    const newStyle = await this.state.dir.import('lib/core/StyleCSS', 'style')
    this.setState({style: newStyle})
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

    dir.set('dir', dir, {constant: true, x: 10, w: 2, h: 2})
    dir.set('app', this, {constant: true, x: 10, w: 2, h: 2})
    dir.set('React', React, {constant: true, x: 10, w: 2, h: 2})
    setTimeout(
      () => dir.set('cmdLine', cmdLine, {constant: true, x: 4, w: 6, h: 4}),
      100,
    )
  }

  setGLRef = (gridLayout) => {
    setTimeout(() => {
      this.state.dir.set('gridLayout', gridLayout, {x: 10, w: 2, h: 2})
    }, 50)
  }

  render() {
    return (
      <div className='app'>
        <style>{this.state.style}</style>
        <Dir ref={this.setDirRef} Obj={GridLayoutObj}>
          <GridLayout ref={this.setGLRef} />
        </Dir>
      </div>
    )
  }
}

App.childContextTypes = {
  storage: PropTypes.object.isRequired,
}

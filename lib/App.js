import React from 'react'

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandLine from './CommandLine'
import CodeContext from './CodeContext'
import GridTest from './GridTest'
import Root from './Root'

import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      things: [
        <ColorPalette key='color-palette' style={{
          gridArea: 'header-start / header-start / footer-end / footer-end',
        }} />,
        <div key='color-overlay' style={{
          backgroundColor: cs.yellow[0],
          gridArea: 'header-start / header-start / footer-end / footer-end',
          opacity: 0.5,
        }} />,
        <GridTest key='grid-test' style={{
          gridArea: 'main-start / main-start / main-end / main-end',
          zIndex: 5,
        }} />
      ],
    }

    this.codeContext = new CodeContext()
    this.codeContext.set('app', this)
  }

  render() {
    console.log('codeContext', this.codeContext)
    return (
      <Root ref={root => this.codeContext.set('root', root)}>
        {this.state.things}

        <CommandLine
          onReturn={this.codeContext.run}
          ref={cmdLine => this.codeContext.set('cmdLine', cmdLine)}
          style={{
            gridArea: 'main',
            zIndex: 101,
          }}
        />
      </Root>
    )
  }
}

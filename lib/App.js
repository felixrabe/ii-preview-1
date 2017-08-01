import React from 'react'

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandLine from './CommandLine'
import CodeContext from './CodeContext'
import GridTest from './GridTest'
import Root from './Root'

import ReactGridLayout from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.codeContext = new CodeContext()
    this.codeContext.set('app', this)

    this.state = {
      things: [

        <div data-grid={{x: 0, y: 0, w: 2, h: 4}} key='color-palette'>
          <ColorPalette />
        </div>,

        <div data-grid={{x: 2, y: 0, w: 4, h: 4}} key='color-overlay'
          style={{
            backgroundColor: cs.yellow[0],
          }}
        />,

        <div data-grid={{x: 2, y: 4, w: 8, h: 6}} key='grid-test'>
          <GridTest />
        </div>,

        <div data-grid={{x: 6, y: 0, w: 2, h: 2}} key='command-line'>
          <CommandLine
            onReturn={this.codeContext.run}
            ref={cmdLine => this.codeContext.set('cmdLine', cmdLine)}
          />
        </div>,

      ],
    }

    this.codeContext.set('things', this.state.things)
  }

  render() {
    return (
      <Root ref={root => this.codeContext.set('root', root)}>
        <ReactGridLayout
          cols={8} rowHeight={30} width={1000}
          verticalCompact={false}
        >
          {this.state.things}
        </ReactGridLayout>
      </Root>
    )
  }
}

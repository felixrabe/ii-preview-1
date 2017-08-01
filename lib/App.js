import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandLine from './CommandLine'
import CodeContext from './CodeContext'
import Root from './Root'

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

        <div data-grid={{x: 0, y: 0, w: 12, h: 3}} key='color-palette-1'>
          <ColorPalette />
        </div>,

        <div data-grid={{x: 0, y: 0, w: 12, h: 3}} key='color-palette-2'>
          <ColorPalette />
        </div>,

        <div data-grid={{x: 0, y: 0, w: 12, h: 3}} key='command-line'>
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
          cols={12} rowHeight={30}
          draggableCancel='.command-line-editor'
          verticalCompact={false}
        >
          {this.state.things}
        </ReactGridLayout>
      </Root>
    )
  }
}

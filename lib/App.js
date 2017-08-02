import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import ColorPalette from './ColorPalette'
import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import Root from './Root'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

// import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.cmdContext = new CommandContext()
    this.cmdContext.set('app', this)

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
            onReturn={this.cmdContext.run}
            ref={cmdLine => this.cmdContext.set('cmdLine', cmdLine)}
          />
        </div>,

      ],
    }

    this.cmdContext.set('things', this.state.things)
  }

  render() {
    return (
      <Root ref={root => this.cmdContext.set('root', root)}>
        <ReactGridLayout
          cols={12} rowHeight={30}
          draggableCancel='.not-draggable'
          verticalCompact={false}
        >
          {this.state.things}
        </ReactGridLayout>
      </Root>
    )
  }
}

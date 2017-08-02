import React from 'react'

import ColorPalette from './ColorPalette'
import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import Root from './Root'

// import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this._isMounted = false

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

  componentDidMount() {
    this._isMounted = true
  }

  componentDidUpdate(prevProps, prevState) {
    this.cmdContext.set('things', this.state.things)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <Root ref={root => this.cmdContext.set('root', root)}>
        {this.state.things}
      </Root>
    )
  }
}

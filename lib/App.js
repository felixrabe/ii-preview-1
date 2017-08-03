import React from 'react'

import ColorPalette from './ColorPalette'
import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import CommandRunner from './CommandRunner'
import Root from './Root'

// import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.cmdContext = new CommandContext()
    this.cmdContext.set('app', this)
    this.cmdContext.set('React', React)

    this.cmdRunner = new CommandRunner(this.cmdContext)

    this._nextName = 0
    this._thingsByName = {}

    this.state = {
      things: [
        this._add(
          <CommandLine
            onReturn={this.cmdRunner.run}
            ref={cmdLine => this.cmdContext.set('cmdLine', cmdLine)}
          />
        ),
        this._add(
          <ColorPalette />
        ),
      ],
    }
  }

  _add = (elem) => {
    const name = this._nextName++
    return this._thingsByName[name] = (
      <div
        data-grid={{x: 0, y: Infinity, w: 12, h: 3}}
        key={name}
      >
        {elem}
      </div>
    )
  }

  add = (elem) => {
    const name = this._nextName
    this.setState(prevState => ({
      things: prevState.things.concat(this._add(elem)),
    }))
    return name
  }

  remove = (name) => {
    const thing = this._thingsByName[name]
    delete this._thingsByName[name]
    this.setState(prevState => ({
      things: prevState.things.filter(t => t !== thing),
    }))
  }

  render() {
    return (
      <Root>
        {this.state.things}
      </Root>
    )
  }
}

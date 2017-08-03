import React from 'react'

import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import Root from './Root'
import Thing from './Thing'
import Things from './Things'

// import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this._isMounted = false

    this.cmdContext = new CommandContext()
    this.cmdContext.set('app', this)
    this.cmdContext.set('React', React)

    this.state = {
      things: this._createThings(),
    }

    this.cmdContext.set('things', this.state.things)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentDidUpdate() {
    this.cmdContext.set('things', this.state.things)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  _createThings = () => {
    const things = new Things({onChange: this.onChange})

    things.add(new Thing(
      <div data-grid={{x: 0, y: 0, w: 12, h: 3}}>
        <CommandLine
          onReturn={this.cmdContext.run}
          ref={cmdLine => this.cmdContext.set('cmdLine', cmdLine)}
        />
      </div>
    ))

    return things
  }

  onChange = (things) => {
    this._isMounted && this.setState({things})
  }

  render() {
    return (
      <Root ref={root => this.cmdContext.set('root', root)}>
        {this.state.things.render()}
      </Root>
    )
  }
}

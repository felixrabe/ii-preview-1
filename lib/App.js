import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import CommandRunner from './CommandRunner'

// import 'font-awesome/css/font-awesome.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.cmdContext = new CommandContext()
    this.cmdContext.set('app', this)
    this.cmdContext.set('React', React)

    this.cmdRunner = new CommandRunner(this.cmdContext)

    this._thingsByName = {}

    this.state = {
      appClassNames: {'animate-none': true},
      things: [
        this._add(
          'cmdLine',
          <CommandLine
            onReturn={this.cmdRunner.run}
          />
        ),
        this._add(
          'palette',
          <ColorPalette />
        ),
      ],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(prevState => ({
        appClassNames: Object.assign(
          {}, prevState.appClassNames, {'animate-none': false}
        ),
      }))
    }, 1000)
  }

  _add = (name, elem) => {
    return this._thingsByName[name] = (
      <div
        className='thing-frame'
        data-grid={{x: 0, y: Infinity, w: 12, h: 3, minW: 2, minH: 2}}
        key={name}
        style={{
          boxShadow: '3px 3px 3px ' + cs.boxShadow,
        }}
      >
        <div
          className='thing-header'
          style={{
            backgroundColor: cs.headerBG,
            color: cs.headerFG,
          }}
        >
          {name}
          {' '}
          <span
            className='thing-command not-draggable'
            onClick={(...a) => this.onHdrCmdClick('remove', name, ...a)}
          >
            [remove]
          </span>
        </div>
        {React.cloneElement(elem, {ref: e => this.cmdContext.set(name, e)})}
      </div>
    )
  }

  add = (name, elem) => {
    this.setState(prevState => ({
      things: prevState.things.concat(this._add(name, elem)),
    }))
  }

  onHdrCmdClick = (cmd, name, ev) => {
    ev.preventDefault()
    switch (cmd) {
    case 'remove':
      this.remove(name)
      break
    }
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
      <div
        className={Object.keys(this.state.appClassNames)
          .sort()
          .filter(n => this.state.appClassNames[n])
          .join(' ')}
        style={{
          backgroundColor: cs.normalBG,
          fontFamily: 'sans-serif',
          fontSize: '1em',
          height: '100%',
          overflow: 'auto',
        }}>
        <style>{`
          .thing-command:hover {
            color: ${cs.headerFGHover};
          }
        `}</style>
        <ReactGridLayout
          cols={12}
          draggableCancel='.not-draggable'
          rowHeight={30}
          verticalCompact={true}
        >
          {this.state.things}
        </ReactGridLayout>
      </div>
    )
  }
}

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

    this._namePrefix = 't'
    this._nextNameNum = 0
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
    const name = this._namePrefix + this._nextNameNum++
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
            onClick={(...a) => this.onHdrCmdClick('copy', name, ...a)}
          >
            [copy]
          </span>
          {' '}
          <span
            className='thing-command not-draggable'
            onClick={(...a) => this.onHdrCmdClick('remove', name, ...a)}
          >
            [remove]
          </span>
        </div>
        {elem}
      </div>
    )
  }

  add = (elem) => {
    const name = this._namePrefix + this._nextNameNum
    this.setState(prevState => ({
      things: prevState.things.concat(this._add(elem)),
    }))
    return name
  }

  onHdrCmdClick = (cmd, name, ev) => {
    ev.preventDefault()
    console.log(cmd, name)
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
      <div style={{
        backgroundColor: cs.normalBG,
        fontFamily: 'sans-serif',
        fontSize: '1em',
        height: '100%',
        overflow: 'auto',
      }}>
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

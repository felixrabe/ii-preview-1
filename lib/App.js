import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import ColorPalette from './ColorPalette'
import {cs} from './Colors'
import CommandContext from './CommandContext'
import CommandLine from './CommandLine'
import CommandRunner from './CommandRunner'
import Repr from './Repr'

// import 'font-awesome/css/font-awesome.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './App.css'

// yeah, I know, internal, but...
const REACT_ELEMENT_TYPE = (
  typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')
) || 0xeac7

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.cmdContext = new CommandContext()
    this.cmdContext.set('React', React)

    this.cmdRunner = new CommandRunner(this.cmdContext)

    this._thingsByName = {}

    this.state = {
      appClassNames: {'animate-none': true},
      things: [
        this._add('cmdLine', <CommandLine onReturn={this.cmdRunner.run} />),
        this._add('palette', <ColorPalette />),
        this._add('app', this),
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
    const ref = e => {
      if (e !== null && typeof e !== 'undefined') {
        e = typeof e._contextObj === 'undefined' ? e : e._contextObj
        this.cmdContext.set(name, e)
      }
    }

    if (elem.$$typeof !== REACT_ELEMENT_TYPE) {
      elem = <Repr obj={elem} />
    }

    return this._thingsByName[name] = (
      <div
        className='thing-frame'
        data-grid={{x: 0, y: Infinity, w: 6, h: 2, minW: 2, minH: 2}}
        key={name}
        style={{
          backgroundColor: cs.normalBG,
          boxShadow: '1px 2px 6px ' + cs.boxShadow,
        }}
      >
        <div
          className='thing-header draggable'
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
        {React.cloneElement(elem, {ref: ref})}
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
    if (typeof name !== 'string') {
      name = this.cmdContext.find(t => t === name)
    }

    const thing = this._thingsByName[name]
    delete this._thingsByName[name]
    setTimeout(() => this.cmdContext.unset(name))
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
          draggableHandle='.draggable'
          rowHeight={30}
          verticalCompact={true}
        >
          {this.state.things}
        </ReactGridLayout>
      </div>
    )
  }

  renderRepr() {
    return (
      <div>
        App
      </div>
    )
  }
}

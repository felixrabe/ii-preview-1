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

    this._objectsByName = {}

    this.state = {
      appClassNames: {'animate-none': true},
      objects: [
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

  _add = (name, obj) => {
    const ref = e => {
      if (e !== null && typeof e !== 'undefined') {
        e = typeof e._contextObj === 'undefined' ? e : e._contextObj
        this.cmdContext.set(name, e)
      }
    }

    if (obj.$$typeof !== REACT_ELEMENT_TYPE) {
      obj = <Repr obj={obj} />
    }

    return this._objectsByName[name] = (
      <div
        className='obj-frame'
        data-grid={{x: 0, y: Infinity, w: 6, h: 2, minW: 2, minH: 2}}
        key={name}
        style={{
          backgroundColor: cs.normalBG,
          boxShadow: '1px 2px 6px ' + cs.boxShadow,
        }}
      >
        <div
          className='obj-header draggable'
          style={{
            backgroundColor: cs.headerBG,
            color: cs.headerFG,
          }}
        >
          {name}
          {' '}
          <span
            className='obj-command not-draggable'
            onClick={(...a) => this.onHdrCmdClick('remove', name, ...a)}
          >
            [remove]
          </span>
        </div>
        {React.cloneElement(obj, {ref: ref})}
      </div>
    )
  }

  add = (name, obj) => {
    this.setState(prevState => ({
      objects: prevState.objects.concat(this._add(name, obj)),
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

    const obj = this._objectsByName[name]
    delete this._objectsByName[name]
    setTimeout(() => this.cmdContext.unset(name))
    this.setState(prevState => ({
      objects: prevState.objects.filter(t => t !== obj),
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
          .obj-command:hover {
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
          {this.state.objects}
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

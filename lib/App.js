import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import ColorPalette from './ColorPalette'
import {ts} from './Theme'
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

    this._namesNotRemovable = {}
    this._objectsByName = {}

    this.state = {
      appClassNames: {'animate-none': true},
      objects: [
        this._add('cmdLine', <CommandLine onReturn={this.cmdRunner.run} />),
        this._add('palette', <ColorPalette />),
        this._add('app', this, {removable: false}),
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

  _add = (name, obj, config = {}) => {
    if (config.removable === false) {
      this._namesNotRemovable[name] = true
    }

    const ref = e => {
      if (e !== null && typeof e !== 'undefined') {
        e = typeof e._contextObj === 'undefined' ? e : e._contextObj
        this.cmdContext.set(name, e)
      }
    }

    if (obj.$$typeof !== REACT_ELEMENT_TYPE) {
      obj = <Repr obj={obj} />
    }

    this._objectsByName[name] = obj = (
      <div
        className='obj-frame'
        data-grid={{x: 0, y: Infinity, w: 6, h: 2, minW: 2, minH: 2}}
        key={name}
        style={{
          backgroundColor: ts.normalBG,
          boxShadow: '1px 2px 6px ' + ts.boxShadow,
        }}
      >
        <div
          className='obj-header draggable'
          style={{
            backgroundColor: ts.headerBG,
            color: ts.headerFG,
            padding: '0px ' + ts.padding,
          }}
        >
          {name}
          {config.removable === false || [
            ' ',
            <span
              className='obj-command not-draggable'
              key='remove-cmd'
              onClick={(...a) => this.onHdrCmdClick('remove', name, ...a)}
            >
              [remove]
            </span>,
          ]}
        </div>
        {React.cloneElement(obj, {ref: ref})}
      </div>
    )

    return obj
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

    if (this._namesNotRemovable[name]) {
      return false
    }

    const obj = this._objectsByName[name]
    delete this._objectsByName[name]
    setTimeout(() => this.cmdContext.unset(name))
    this.setState(prevState => ({
      objects: prevState.objects.filter(t => t !== obj),
    }))

    return true
  }

  render() {
    return (
      <div
        className={Object.keys(this.state.appClassNames)
          .sort()
          .filter(n => this.state.appClassNames[n])
          .join(' ')}
        style={{
          backgroundColor: ts.normalBG,
          fontFamily: 'sans-serif',
          fontSize: '1em',
          height: '100%',
          overflow: 'auto',
        }}>
        <style>{`
          .obj-command:hover {
            color: ${ts.headerFGHover};
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
      <div
        style={{
          padding: ts.padding,
        }}
      >
        App
      </div>
    )
  }
}

import React from 'react'
import Draggable from 'react-draggable'

import {isValidElement} from './ReactElement_internal'
import Icon from './ui/Icon'

export default class Obj extends React.Component {
  extractProps = () => {
    const {cfg, children, className, dir, name, ...props} = this.props
    return {cfg, children, className, dir, name, props}
  }

  onHdrCmdClick = (cmd, ev) => {
    ev.preventDefault()
    switch (cmd) {
    case 'remove':
      this.props.scope.delete(this.props.name)
      break
    }
  }

  renderHeader = () => {
    return (
      <div className='core-obj-header core-draggable'>
        <div className='core-obj-header-item'>
          {this.props.name}
        </div>
        <div className='core-obj-header-space' />
        <div className='core-obj-header-item'>
          <span className='core-obj-command core-not-draggable'
            onClick={(...a) => this.onHdrCmdClick('remove', ...a)}
          >
            <Icon.Remove title='remove' />
          </span>
        </div>
      </div>
    )
  }

  renderBody = () => {
    const children = []

    this.props.children.forEach(c => {
      if (!(isValidElement(c) && c.type === Draggable.DraggableCore)) {
        children.push(c)
      }
    })

    let child = children[0]

    if (isValidElement(child)) {
      // empty
    } else if (child && typeof child === 'object' && '_reactRepr' in child) {
      child = child._reactRepr()
    } else {
      child = (
        <div className='core-padding'><em>Opaque {typeof child}</em></div>
      )
    }

    return (
      <div className='core-obj-body'>
        {child}
      </div>
    )
  }

  renderResizeHandle = () => {
    let handle = null

    this.props.children.forEach(c => {
      if (isValidElement(c) && c.type === Draggable.DraggableCore) {
        handle = c
      }
    })

    return handle
  }

  render() {
    const {className, props} = this.extractProps()
    props.className = className + ' core-obj'

    return (
      <div {...props}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderResizeHandle()}
      </div>
    )
  }
}

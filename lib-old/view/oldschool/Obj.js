import React from 'react'
import Draggable from 'react-draggable'

import {isValidElement} from './ReactElement_internal'
import Icon from './Icon'

export default class Obj extends React.Component {
  componentDidMount() {
    if (this.props.cfg.savedState) {
      this.childRef.setState(this.props.cfg.savedState)
      delete this.props.cfg.savedState
    }
  }

  componentWillUnmount() {
    if (this.childRef) {
      this.props.cfg.savedState = this.childRef.state
    }

    this.props.unref()
  }

  extractProps() {
    const {cfg, children, className, dir, name, unref, ...props} = this.props
    return {cfg, children, className, dir, name, unref, props}
  }

  onHdrCmdClick = (cmd, ev) => {
    ev.preventDefault()
    switch (cmd) {
    case 'hide':
      this.props.scope.hide(this.props.name)
      break
    case 'remove':
      this.props.scope.delete(this.props.name)
      break
    }
  }

  receiveChildRef = (origElement, childRef) => {
    this.childRef = childRef
    origElement.props.ref && origElement.props.ref(childRef)
  }

  renderHeader() {
    return (
      <div className='ii-obj-header ii-draggable'>
        <div className='ii-obj-header-item'>
          {this.props.name}
        </div>
        <div className='ii-obj-header-space' />
        { this.props.cfg.canHide && (
          <div className='ii-obj-header-item'>
            <span className='ii-obj-command ii-not-draggable'
              onClick={(...a) => this.onHdrCmdClick('hide', ...a)}
            >
              <Icon.Hide title='hide' />
            </span>
          </div>
        ) }
        { this.props.cfg.constant || (
          <div className='ii-obj-header-item'>
            <span className='ii-obj-command ii-not-draggable'
              onClick={(...a) => this.onHdrCmdClick('remove', ...a)}
            >
              <Icon.Remove title='remove' />
            </span>
          </div>
        ) }
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
      child = React.cloneElement(child, {
        ref: c => this.receiveChildRef(child, c),
      })
    } else if (child && typeof child === 'object' && '_reactRepr' in child) {
      child = child._reactRepr()
    } else {
      child = (
        <div className='ii-padding ii-repr'>Opaque {typeof child}</div>
      )
    }

    return (
      <div className='ii-obj-body'>
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
    props.className = className + ' ii-obj'

    return (
      <div {...props}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderResizeHandle()}
      </div>
    )
  }
}

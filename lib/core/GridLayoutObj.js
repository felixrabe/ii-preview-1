import React from 'react'

import Icon from './Icon'
import GridLayoutObjCfg from './GridLayoutObjCfg'
import Obj from './Obj'

export default class GridLayoutObj extends Obj {
  static Cfg = GridLayoutObjCfg

  onHdrCmdClick = (cmd, ev) => {
    ev.preventDefault()
    switch (cmd) {
    case 'remove':
      this.props.dir.delete(this.props.name)
      break
    case 'serialize':
      alert(`Not implemented: serializing "${this.props.name}"`)
      break
    }
  }

  renderHeader = (name, cfg) => {
    return (
      <div className='obj-header draggable'>
        {name}
        {cfg.constant || [' ',
          <span key='rm'
            className='obj-command not-draggable'
            onClick={(...a) => this.onHdrCmdClick('remove', ...a)}
          >
            <Icon.WindowClose title='remove' />
          </span>,
        ]}
        {' '}
        <span key='ser'
          className='obj-command not-draggable'
          onClick={(...a) => this.onHdrCmdClick('serialize', ...a)}
        >
          <Icon.Serialize title='serialize' />
        </span>
      </div>
    )
  }

  render() {
    const {cfg, className, name, props} = this.extractProps()
    props.className = className + ' obj-frame'

    return (
      <div {...props}>
        {this.renderHeader(name, cfg)}
        <div className='obj'>
          {this.repr()}
        </div>
      </div>
    )
  }
}

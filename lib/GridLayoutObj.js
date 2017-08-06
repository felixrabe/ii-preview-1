import React from 'react'

import Icon from './Icon'
import Obj from './Obj'

export default class GridLayoutObj extends Obj {
  onHdrCmdClick = (cmd, ev) => {
    ev.preventDefault()
    switch (cmd) {
    case 'remove':
      this.props.dir.delete(this.props.name)
      break
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {cfg, children, className, dir, name, ...props} = this.props
    props.className = className + ' obj-frame'

    return (
      <div {...props}>
        <div className='obj-header draggable'>
          {name}
          {cfg.canDelete && [' ',
            <span key='rm'
              className='obj-command not-draggable'
              onClick={(...a) => this.onHdrCmdClick('remove', ...a)}
            >
              <Icon.WindowClose title='remove' />
            </span>,
          ]}
        </div>
        {this.repr()}
      </div>
    )
  }
}

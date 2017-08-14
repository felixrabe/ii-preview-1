import React from 'react'
import PropTypes from 'prop-types'

import {changeToJail, join, sanitize} from '../../data/DataPath'
import style from './Style.js'

const cl = (...nn) =>
  ({className: nn.map(n => 'idev-navigator-' + n).join(' ')})

class Action extends React.Component {
  render() {
    if (typeof this.props.if === 'undefined' || this.props.if) {
      return (
        <span {...cl('navitem', 'action')} onClick={this.props.onClick}>
          {this.props.children}
        </span>
      )
    } else {
      return null
    }
  }
}

export default class NavigatorView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      root: sanitize(this.props.config.root),
      relPath: '',
      dir: undefined,
      data: undefined,
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this.update()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.config.root === nextProps.config.root) {
      return
    }

    this.setState({
      root: sanitize(nextProps.root),
      relPath: '',
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.root === this.state.root) {
      if (prevState.relPath === this.state.relPath) {
        return
      }
    }

    this.setState({data: undefined})
    this.update()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async update() {
    const dataPath = join(this.state.root, this.state.relPath)
    const dirPath = join(dataPath, '$$instadev$$_dir')
    const data = await this.context.dataAccess.get(dataPath)
    const dir = await this.context.dataAccess.get(dirPath)
    this.setState({data, dir})
  }

  goTo(where) {
    const jail = changeToJail(this.state.root, this.state.relPath, where)
    this.setState({relPath: jail[1]})
  }

  onClickDirItem = (dirItem) => {
    this.goTo(dirItem)
  }

  back = () => this.goTo('..')

  renderRelPath() {
    const p = join(this.state.root, this.state.relPath)
    return p.slice(this.state.root.length)
  }

  onClickDelete = async () => {
    const path = join(this.state.root, this.state.relPath)
    await this.context.dataAccess.delete(path)
    this.goTo('..')
  }

  renderNav() {
    const dataType = this.getDataType()
    const deletable = ['json', 'string'].some(t => dataType.includes(t))
    return (
      <div {...cl('nav')}>
        <span {...cl('navitem', 'root')}>
          {this.state.root}
        </span>
        <span {...cl('navitem', 'relpath')} onClick={this.back}>
          {this.renderRelPath()}
        </span>
        <span {...cl('navitem', 'datatype')}>
          {dataType.join('+')}
        </span>
        <Action if={deletable} onClick={this.onClickDelete}>delete</Action>
      </div>
    )
  }

  renderDir() {
    return (
      <div key='dir' className='idev-navigator-dir'>
        {this.state.dir.map(c => (
          <div
            className='idev-navigator-diritem'
            key={c}
            onClick={ev => this.onClickDirItem(c, ev)}
          >
            {c}
          </div>
        ))}
      </div>
    )
  }

  getDataType() {
    let dataType = []
    if (this.state.dir !== undefined) {
      dataType.push('dir')
    }

    if (this.state.data === undefined) {
      /* empty */
    } else if (typeof this.state.data === 'string') {
      dataType.push('string')
    } else {
      dataType.push('json')
    }

    return dataType
  }

  renderFileContent() {
    const dataType = this.getDataType()
    if (dataType.includes('string')) {
      return this.state.data
    } else {
      return JSON.stringify(this.state.data, null, 2)
    }
  }

  renderData() {
    return (
      <div key='data' className='idev-navigator-data'>
        {this.renderFileContent()}
      </div>
    )
  }

  renderBody() {
    return (
      <div className='idev-navigator-body'>
        {this.state.dir !== undefined && this.renderDir()}
        {this.state.data !== undefined && this.renderData()}
      </div>
    )
  }

  render() {
    return (
      <div className='idev-navigator'>
        <style>{style}</style>
        {this.renderNav()}
        {this.renderBody()}
      </div>
    )
  }
}

NavigatorView.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}

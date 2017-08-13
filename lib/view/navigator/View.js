import React from 'react'
import PropTypes from 'prop-types'

import {changeToJail, join, sanitize} from '../../data/DataPath'
import style from './Style.js'

const cl = (...nn) =>
  ({className: nn.map(n => 'idev-navigator-' + n).join(' ')})

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

  onClickDirItem = (dirItem) => {
    const jail = changeToJail(this.state.root, this.state.relPath, dirItem)
    this.setState({relPath: jail[1]})
  }

  back = () => this.onClickDirItem('..')

  renderRelPath() {
    const p = join(this.state.root, this.state.relPath)
    return p.slice(this.state.root.length)
  }

  renderNav() {
    return (
      <div {...cl('nav')}>
        <span {...cl('navitem', 'root')}>
          {this.state.root}
        </span>
        <span {...cl('navitem', 'relpath')} onClick={this.back}>
          {this.renderRelPath()}
        </span>
        <span {...cl('navitem', 'datatype')}>
          {this.getDataType().join('+')}
        </span>
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

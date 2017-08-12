import React from 'react'
import PropTypes from 'prop-types'

import {changeToJail, join, sanitize} from '../../data/DataPath'
import Loading from '../Loading'

const dirItemStyle = {cursor: 'pointer', userSelect: 'none'}

class Dir extends React.Component {
  render() {
    return (
      <div>
        {this.props.children.map(c => (
          <div
            key={c}
            onClick={ev => this.props.onClickItem(c, ev)}
            style={dirItemStyle}
          >
            {c}
          </div>
        ))}
      </div>
    )
  }
}

export default class PlainView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      root: sanitize(this.props.config.root),
      relPath: '',
      data: <Loading />,
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

    this.setState({data: <Loading />})
    this.update()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onClickDirItem = (dirItem) => {
    const jail = changeToJail(this.state.root, this.state.relPath, dirItem)
    this.setState({relPath: jail[1]})
  }

  async update() {
    let data = [
      <div key='back' onClick={ev => this.onClickDirItem('..', ev)}
        style={dirItemStyle}
      >
        ..
      </div>,
    ]

    const root = join(this.state.root || '', this.state.relPath)
    const path = join(root, '$$instadev$$_dir')
    const dir = await this.context.dataAccess.get(path)

    if (typeof dir === 'undefined') {
      data = data.concat(
        JSON.stringify(await this.context.dataAccess.get(root))
      )
    } else {
      data = data.concat(
        <Dir key='dir' onClickItem={this.onClickDirItem}>{dir}</Dir>
      )
    }

    this.setState({data})
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
        <div style={{opacity: 0.6}}>
          {JSON.stringify(this.state.root)}
          {' // '}
          {JSON.stringify(this.state.relPath)}
        </div>
        {this.state.data}
      </div>
    )
  }
}

PlainView.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}

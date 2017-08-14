import React from 'react'
import PropTypes from 'prop-types'
import D from 'draft-js'

import {changeToJail, join, sanitize} from '../../data/DataPath'
import style from './Style.js'

const cl = (...nn) =>
  ({className: nn.map(n => 'idev-navigator-' + n).join(' ')})

const stateFromData = (data) => {
  let text = ''
  if (typeof data !== 'undefined') {
    if (typeof data === 'string') {
      text = data
    } else {
      text = JSON.stringify(data, null, 2)
    }
  }

  const editorState = newEditorStateFromText(text)
  return {data, text, editorState}
}

const newEditorStateFromText = (text) => {
  const content = D.ContentState.createFromText(text)
  const editorState = D.EditorState.createWithContent(content)
  return D.EditorState.moveSelectionToEnd(editorState)
}

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
      editorState: D.EditorState.createEmpty(),
      text: '',
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

    const state = stateFromData(data)

    this.setState({...state, dir})
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

  onClickNew = async () => {
    const name = prompt('Enter a name')
    if (name === null || name === '') {
      return
    }

    const path = join(this.state.root, this.state.relPath, name)
    await this.context.dataAccess.set(path, '')
    this.goTo(name)
  }

  onClickSave = async () => {
    const path = join(this.state.root, this.state.relPath)
    const text = this.getEditorStateText()
    let data = text
    if (this.getDataType().pop() !== 'string') {
      try {
        data = JSON.parse(text)
      } catch (err) {
        alert(err)
        return
      }
    }

    await this.context.dataAccess.set(path, data)
    data = await this.context.dataAccess.get(path)
    this.setState(stateFromData(data))
  }

  onClickToJSON = async () => {
    const path = join(this.state.root, this.state.relPath)
    const text = this.getEditorStateText()
    let data
    try {
      data = JSON.parse(text)
    } catch (err) {
      alert(err)
      return
    }

    await this.context.dataAccess.set(path, data)
    data = await this.context.dataAccess.get(path)
    this.setState(stateFromData(data))
  }

  onClickRevert = async () => {
    this.setState({editorState: newEditorStateFromText(this.state.text)})
  }

  onClickDelete = async () => {
    const path = join(this.state.root, this.state.relPath)
    await this.context.dataAccess.delete(path)
    this.goTo('..')
  }

  getEditorStateText() {
    return this.state.editorState.getCurrentContent().getPlainText()
  }

  renderNav() {
    const dataType = this.getDataType()
    const lastDataType = [...dataType].pop()
    const hasData = ['json', 'string'].includes(lastDataType)
    const isString = lastDataType === 'string'
    const modified = this.getEditorStateText() !== this.state.text
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
        <Action onClick={this.onClickNew}>new</Action>
        <Action if={modified} onClick={this.onClickSave}>save</Action>
        <Action if={isString} onClick={this.onClickToJSON}>to JSON</Action>
        <Action if={modified} onClick={this.onClickRevert}>revert</Action>
        <Action if={hasData} onClick={this.onClickDelete}>delete</Action>
      </div>
    )
  }

  renderDir() {
    if (this.state.dir === undefined) {
      return <div key='dir' className='idev-navigator-dir' style={{padding: '0px'}} />
    } else {
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

  onChange = (editorState) => {
    this.setState({editorState})
  }

  focus = (opt = {}) => {
    if (opt.toEnd) {
      setTimeout(() => {
        this.setState(prevState => ({
          editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
        }))
        this.focus({toEnd: false})
      })
    } else {
      // https://labs.ft.com/2009/11/disappearing-text-cursor-in-firefox/
      this.editor.blur()
      this.editor.focus()
    }
  }

  renderData() {
    if (this.state.data === undefined) {
      return <div />
    } else {
      return (
        <div key='data' className='idev-navigator-data' onClick={this.focus}>
          <div onClick={e => e.stopPropagation()}>
            <D.Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={e => this.editor = e}
            />
          </div>
        </div>
      )
    }
  }

  renderBody() {
    return (
      <div className='idev-navigator-body'>
        {this.renderDir()}
        {this.renderData()}
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

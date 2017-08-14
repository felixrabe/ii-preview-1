/* eslint max-lines: "warn" */

import React from 'react'
import PropTypes from 'prop-types'
import D from 'draft-js'

import Action from './Action'
import ActionNew from './ActionNew'
import {changeToJail, join, sanitize} from '../../data/DataPath'
import style from './Style.js'
import {
  cl,
  newEditorStateFromText,
  stateFromData,
} from './Utils.js'

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
    const dataPath = this.getPath()
    const dirPath = join(dataPath, '$$instadev$$_dir')
    const data = await this.context.dataAccess.get(dataPath)
    const dir = await this.context.dataAccess.get(dirPath)

    const state = stateFromData(data)

    this.setState({...state, dir})
  }

  saveData = async (data) => {
    await new Promise(resolve => {
      setTimeout(async () => {
        const path = this.getPath()
        await this.context.dataAccess.set(path, data)
        data = await this.context.dataAccess.get(path)
        this.setState(stateFromData(data))
        resolve()
      })
    })
  }

  goTo = (where) => {
    const jail = changeToJail(this.state.root, this.state.relPath, where)
    this.setState({relPath: jail[1]})
  }

  onClickDirItem = (dirItem) => {
    this.goTo(dirItem)
  }

  back = () => this.goTo('..')

  renderRelPath() {
    return this.getPath().slice(this.state.root.length)
  }

  onClickSave = async () => {
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

    await this.saveData(data)
  }

  onClickToJSON = async () => {
    const text = this.getEditorStateText()
    try {
      const data = JSON.parse(text)
      await this.saveData(data)
    } catch (err) {
      alert(err)
      return
    }
  }

  onClickToString = async () => {
    const text = this.getEditorStateText()
    await this.saveData(text)
  }

  onClickRevert = async () => {
    this.setState({editorState: newEditorStateFromText(this.state.text)})
  }

  onClickDelete = async () => {
    await this.context.dataAccess.delete(this.getPath())
    this.goTo('..')
  }

  getEditorStateText() {
    return this.state.editorState.getCurrentContent().getPlainText()
  }

  getPath() {
    return join(this.state.root, this.state.relPath)
  }

  renderNav() {
    const dataType = this.getDataType()
    const lastDataType = [...dataType].pop()
    const hasData = ['json', 'string'].includes(lastDataType)
    const isString = lastDataType === 'string'
    const isJSON = lastDataType === 'json'
    const modified = this.getEditorStateText() !== this.state.text
    const props = {
      goTo: this.goTo,
      path: this.getPath(),
      saveData: this.saveData,
    }
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
        <ActionNew {...props} />
        <Action if={modified} onClick={this.onClickSave}>save</Action>
        <Action if={isString} onClick={this.onClickToJSON}>to JSON</Action>
        <Action if={isJSON} onClick={this.onClickToString}>to string</Action>
        <Action if={modified} onClick={this.onClickRevert}>revert</Action>
        <Action if={hasData} onClick={this.onClickDelete}>delete</Action>
      </div>
    )
  }

  renderDir() {
    if (this.state.dir === undefined) {
      return <div key='dir' {...cl('dir')} style={{padding: '0px'}} />
    } else {
      return (
        <div key='dir' {...cl('dir')}>
          {this.state.dir.map(c => (
            <div
              {...cl('diritem')}
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
        <div key='data' {...cl('data')} onClick={this.focus}>
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
      <div {...cl('body')}>
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

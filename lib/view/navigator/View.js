/* eslint max-lines: ["error", 240] */

import React from 'react'
import PropTypes from 'prop-types'
import D from 'draft-js'

import * as Action from './Action'
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
    if (!this.state.forceUpdate && prevState.root === this.state.root) {
      if (prevState.relPath === this.state.relPath) {
        return
      }
    }

    this.setState({data: undefined, forceUpdate: false})
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

  getEditorStateText = () => {
    return this.state.editorState.getCurrentContent().getPlainText()
  }

  getPath() {
    return join(this.state.root, this.state.relPath)
  }

  revert = () => {
    this.setState({editorState: newEditorStateFromText(this.state.text)})
  }

  renderNav() {
    const dataType = this.getDataType()
    const path = this.getPath()
    const lastDataType = [...dataType].pop()
    const hasData = ['json', 'string'].includes(lastDataType)
    const isString = lastDataType === 'string'
    const isJSON = lastDataType === 'json'
    const modified = this.getEditorStateText() !== this.state.text
    const props = {
      delete: async () => await this.context.dataAccess.delete(path),
      forceUpdate: () => this.setState({forceUpdate: true}),
      getDataType: this.getDataType,
      getEditorStateText: this.getEditorStateText,
      goTo: this.goTo,
      hasData: hasData,
      hasDir: this.state.dir !== undefined,
      isJSON: isJSON,
      isString: isString,
      modified: modified,
      path: path,
      revert: this.revert,
      saveData: this.saveData,
    }
    return (
      <div {...cl('nav')}>
        <span {...cl('navitem', 'root')}>
          {this.state.root}
        </span>
        <span {...cl('navitem', 'relpath')} onClick={this.back}>
          {this.getPath().slice(this.state.root.length)}
        </span>
        <span {...cl('navitem', 'datatype')}>
          {dataType.join('+')}
        </span>
        <Action.New {...props} />
        <Action.Save {...props} />
        <Action.ToJSON {...props} />
        <Action.ToString {...props} />
        <Action.Revert {...props} />
        <Action.Delete {...props} />
        <Action.AddData {...props} />
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

  getDataType = () => {
    let dataType = []
    if (this.state.dir !== undefined) {
      dataType.push('dir')
    }

    if (this.state.data !== undefined) {
      dataType.push(typeof this.state.data === 'string' ? 'string' : 'json')
    }

    return dataType
  }

  focus = () => {
    // https://labs.ft.com/2009/11/disappearing-text-cursor-in-firefox/
    this.editor.blur()
    this.editor.focus()
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
              onChange={editorState => this.setState({editorState})}
              ref={e => this.editor = e}
            />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='idev-navigator'>
        <style>{style}</style>
        {this.renderNav()}
        <div {...cl('body')}>
          {this.renderDir()}
          {this.renderData()}
        </div>
      </div>
    )
  }
}

NavigatorView.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}

/* global $app */

import React from 'react'
import PropTypes from 'prop-types'
import D from 'draft-js'
import Draggable from 'react-draggable'

import style from './Style.js'
import View from '../View'

class DevBarDragHandle extends React.Component {
  render() {
    return (
      <div className='ii-devbar-drag-handle' style={style.DevBarDragHandle}>
        -- {this.props.children} --
      </div>
    )
  }
}

class DevBarEditor extends React.Component {
  focus() {
    this.editor.focus()
  }

  handleReturn = (e, editorState) => {
    this.props.onReturn(editorState.getCurrentContent().getPlainText())
    return true
  }

  render() {
    return (
      <div style={style.DevBarEditor}>
        <D.Editor
          editorState={this.props.editorState}
          handleReturn={this.handleReturn}
          onChange={this.props.onChange}
          ref={e => this.editor = e}
        />
      </div>
    )
  }
}

class DevBarCmd extends React.Component {
  onClick = () => {
    const editorState = this.context.getEditorState()
    const text = editorState.getCurrentContent().getPlainText()
    this.props.children[1](text)
    this.context.getEditor().focus()
  }

  render() {
    return (
      <div onClick={this.onClick} style={style.DevBarCmd}>
        {this.props.children[0]}
      </div>
    )
  }
}

DevBarCmd.contextTypes = {
  // changeEditorState: PropTypes.func.isRequired,
  getEditor: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
}

class DevBar extends React.Component {
  constructor(props) {
    super(props)

    const viewPath = this.props.view.state.viewPath
    const content = D.ContentState.createFromText(viewPath)
    const editorState = D.EditorState.createWithContent(content)

    this.state = {
      editorState,
    }
  }

  getChildContext() {
    return {
      // changeEditorState: this.onEditorChange,
      getEditor: () => this.editor,
      getEditorState: () => this.state.editorState,
    }
  }

  onEditorChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    const props = {
      className: this.props.className,
      onMouseDown: this.props.onMouseDown,
      onMouseUp: this.props.onMouseUp,
      onTouchEnd: this.props.onTouchEnd,
      onTouchStart: this.props.onTouchStart,
      style: Object.assign({}, style.DevBar, this.props.style),
    }

    return (
      <div {...props}>
        <DevBarDragHandle>
          {this.props.view.state.viewPath}
        </DevBarDragHandle>

        <DevBarEditor
          editorState={this.state.editorState}
          onChange={this.onEditorChange}
          onReturn={text => {
            this.props.view.setState({viewPath: text})
          }}
          ref={e => this.editor = e}
        />

        <DevBarCmd>set viewPath {text => {
          this.props.view.setState({viewPath: text})
        }}</DevBarCmd>

        <DevBarCmd>refresh {() => {
          $app.refresh()
        }}</DevBarCmd>
      </div>
    )
  }
}

DevBar.childContextTypes = {
  // changeEditorState: PropTypes.func.isRequired,
  getEditor: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
}

export default class DevBarView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewPath: this.props.config.viewPath,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const selfPath = this.props.config.selfPath
    if (selfPath !== undefined) {
      const newConfig = Object.assign({}, this.props.config, {
        // removed from config by lib/view/View
        'ii_type': 'import:lib/view/devbar/View',
        viewPath: nextState.viewPath,
      })
      this.context.store.set(selfPath, newConfig)
    }
  }

  render() {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <View key='view' path={this.state.viewPath} />
        <Draggable handle='.ii-devbar-drag-handle'>
          <DevBar view={this} />
        </Draggable>
      </div>
    )
  }
}

DevBarView.contextTypes = {
  store: PropTypes.object.isRequired,
}

import D from 'draft-js'
import React from 'react'
import * as UI from './UI/index'

import './CommandLine.css'

export default class CommandLine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: D.EditorState.createEmpty(),
      error: null,
      isProcessingCommand: false,
    }
  }

  getPlainText = (editorState) => {
    editorState || (editorState = this.state.editorState)
    return editorState.getCurrentContent().getPlainText()
  }

  onChange = (editorState) => {
    const isSameText = this.getPlainText() === this.getPlainText(editorState)
    const newError = (isSameText ? this.state.error : null)
    this.setState({
      editorState: editorState,
      error: newError,
    })
  }

  processCommand = async (command, focus) => {
    this.setState({
      error: null,
      isProcessingCommand: true,
    })
    try {
      const text = await this.props.onCommand(command) || ''
      const content = D.ContentState.createFromText(text)
      this.setState({
        editorState: D.EditorState.createWithContent(content),
        error: null,
        isProcessingCommand: false,
      })
      focus && this.focusToEnd()
    } catch (err) {
      this.setState({
        error: err,
        isProcessingCommand: false,
      })
      focus && this.focusToEnd()
    }
  }

  onReturn = (e, editorState) => {
    this.processCommand(editorState.getCurrentContent().getPlainText(), true)
    return true
  }

  focus = () => {
    this.input.focus()
  }

  focusToEnd = () => {
    this.focus()
    this.setState(prevState => ({
      editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
    }))
  }

  render = () => (
    <UI.Menu disabled={this.state.isProcessingCommand}>
      {[
        ['help', 'Show Help'],
        ['text', 'Add Text'],
        ['code', 'Add Code'],
        ['run', 'Run'],
      ].map(([command, label]) => (
        <UI.MenuItem
          key={command}
          onClick={() => this.processCommand(command)}
        >
          {label}
        </UI.MenuItem>
      ))}
      <UI.MenuItem onClick={this.focus} disableTab>
        {'> '}
        <UI.Input
          ref={i => this.input = i}
          readOnly={this.state.isProcessingCommand}
          editorState={this.state.editorState}
          onChange={this.onChange}
          onReturn={this.onReturn}
        />
      </UI.MenuItem>
      {this.state.error && <UI.MenuItem error>
        {this.state.error.toString()}
      </UI.MenuItem>}
    </UI.Menu>
  )
}

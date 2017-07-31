import D from 'draft-js'
import processCommand from './processCommand'
import React from 'react'
import renderCommandMenuItems from './renderCommandMenuItems'
import renderErrorAsMenuItem from './renderErrorAsMenuItem'
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

  focus = () => {
    this.input.focus()
  }

  focusToEnd = () => {
    this.focus()
    this.setState(prevState => ({
      editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
    }))
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

  onReturn = (e, editorState) => {
    this.processCommand(editorState.getCurrentContent().getPlainText(), true)
    return true
  }

  processCommand = async (command, focus) => {
    return await processCommand(
      this,
      command,
      focus,
      (result) => {
        const content = D.ContentState.createFromText(result || '')
        return {
          editorState: D.EditorState.createWithContent(content),
        }
      },
    )
  }

  render = () => (
    <UI.Menu disabled={this.state.isProcessingCommand}>
      {renderCommandMenuItems([  // order by intuition
        ['help', 'Show Help'],
        ['text', 'Add Text'],
        ['code', 'Add Code'],
        ['run', 'Run'],
      ], this.processCommand)}
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
      {renderErrorAsMenuItem(this.state.error, () => {
        console.log(this.state.error)
        this.setState({error: null})
      })}
    </UI.Menu>
  )
}

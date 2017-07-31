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
        if (focus) {
          const content = D.ContentState.createFromText(result || '')
          return {
            editorState: D.EditorState.createWithContent(content),
          }
        } else {
          return {}
        }
      },
    )
  }

  render = () => (
    <UI.Menu className='command-line' disabled={this.state.isProcessingCommand}>
      {renderCommandMenuItems([  // order by intuition
        ['help', 'Show Help'],
        ['text', 'Add Text'],
        ['code', 'Add Code'],
      ], this.processCommand)}
      <UI.MenuItem
        className='command-line-input'
        disableTab
        onClick={this.focus}
      >
        {'> '}
        <UI.Input
          editorState={this.state.editorState}
          onChange={this.onChange}
          onReturn={this.onReturn}
          readOnly={this.state.isProcessingCommand}
          ref={i => this.input = i}
        />
      </UI.MenuItem>
      {renderErrorAsMenuItem(this.state.error, () => {
        console.log(this.state.error)
        this.setState({error: null})
      })}
    </UI.Menu>
  )
}

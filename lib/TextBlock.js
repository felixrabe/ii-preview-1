import D from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import * as UI from './UI/index'

import './TextBlock.css'

export default class TextBlock extends React.Component {
  constructor(props) {
    super(props)

    const content = D.ContentState.createFromText(props.value || '')
    const editorState = D.EditorState.createWithContent(content)

    this.state = {
      // editorState: D.EditorState.moveFocusToEnd(editorState),
      editorState: D.EditorState.moveSelectionToEnd(editorState),
      error: null,
      isProcessingCommand: false,
    }
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  focus = () => {
    this.textArea.focus()
    ReactDOM.findDOMNode(this).scrollIntoView()
  }

  focusToEnd = () => {
    this.focus()
    this.setState(prevState => ({
      editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
    }))
  }

  getText = () => {
    return this.state.editorState.getCurrentContent().getPlainText()
  }

  onChange = (editorState) => {
    this.setState({
      editorState: editorState,
    })
  }

  processCommand = async (command, focus) => {
    this.setState({
      error: null,
      isProcessingCommand: true,
    })

    try {
      await this.props.onCommand(command)
      if (this._isMounted === false) {
        return
      }

      this.setState({
        error: null,
        isProcessingCommand: false,
      })
    } catch (err) {
      if (this._isMounted === false) {
        return
      }

      this.setState({
        error: err,
        isProcessingCommand: false,
      })
    }

    focus && this.focusToEnd()
  }

  render = () => (
    // console.log('rendering', this.props.name),
    <UI.TextArea
      className='ui-area'
      disabled={this.state.isProcessingCommand}
      editorState={this.state.editorState}
      onChange={this.onChange}
      onClick={this.focus}
      ref={t => this.textArea = t}
    >
      <UI.Menu>
        {[
          ['help', 'Show Help'],
          ['remove', 'Remove'],
        ].map(([command, label]) => (
          <UI.MenuItem
            key={command}
            onClick={() => this.processCommand(command)}
          >
            {label}
          </UI.MenuItem>
        ))}
        {this.state.error && <UI.MenuItem error>
          {this.state.error.toString()}
        </UI.MenuItem>}
      </UI.Menu>
    </UI.TextArea>
  )
}

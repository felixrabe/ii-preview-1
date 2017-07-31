import D from 'draft-js'
import processCommand from './processCommand'
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
    return await processCommand(this, command, focus)
  }

  render = () => (
    <UI.TextArea
      className='ui-area'
      disabled={this.state.isProcessingCommand}
      editorState={this.state.editorState}
      onChange={this.onChange}
      onClick={this.focus}
      ref={t => this.textArea = t}
    >
      <UI.Menu> {/* TODO: DRY */}
        {[
          ['remove', 'Remove'],
        ].map(([command, label]) => (
          <UI.MenuItem
            key={command}
            onClick={() => this.processCommand(command)}
          >
            {label}
          </UI.MenuItem>
        ))}
        {this.state.error && (  // TODO: DRY
          <UI.MenuItem error onClick={() => console.log(this.state.error)}>
            {this.state.error.toString()}
          </UI.MenuItem>
        )}
      </UI.Menu>
    </UI.TextArea>
  )
}

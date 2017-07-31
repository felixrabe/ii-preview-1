import D from 'draft-js'
import React from 'react'
import * as UI from './UI/index'

import './TextBlock.css'

export default class TextBlock extends React.Component {
  constructor(props) {
    super(props)

    const content = D.ContentState.createFromText(props.value || '')
    const editorState = D.EditorState.createWithContent(content)

    this.state = {
      editorState: D.EditorState.moveFocusToEnd(editorState),
    }
  }

  getText = () => {
    return this.state.editorState.getCurrentContent().getPlainText()
  }

  onChange = (editorState) => {
    this.setState({
      editorState: editorState,
    })
  }

  focus = () => {
    this.textArea.focus()
  }

  render = () => (
    <UI.TextArea
      ref={t => this.textArea = t}
      className='ui-area'
      editorState={this.state.editorState}
      onChange={this.onChange}
      onClick={this.focus}
    />
  )
}

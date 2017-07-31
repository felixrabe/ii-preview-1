import D from 'draft-js'
import React from 'react'
import TextInputBase from './TextInputBase'

import './Input.css'

export default class Input extends TextInputBase {
  constructor(props) {
    super(props, 'ui-input')
  }

  handleDrop = () => {
    return true
  }

  handleDroppedFiles = () => {
    return true
  }

  handlePastedFiles = () => {
    return true
  }

  handlePastedText = (text) => {
    text = text.split('\n', 1)[0]
    const es = this.props.editorState
    const content = es.getCurrentContent()
    const sel = es.getSelection()
    const newContent = D.Modifier.replaceText(content, sel, text)
    this.props.onChange(D.EditorState.push(es, newContent, 'insert-fragment'))
    return true
  }

  renderEditor = () => {
    const editor = super.renderEditor()
    const newProps = {
      handleDrop: this.handleDrop,
      handleDroppedFiles: this.handleDroppedFiles,
      handlePastedFiles: this.handlePastedFiles,
      handlePastedText: this.handlePastedText,
      handleReturn: this.props.onReturn,
    }
    return React.cloneElement(editor, newProps)
  }
}

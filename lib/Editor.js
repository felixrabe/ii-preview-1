import D from 'draft-js'
import React from 'react'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: D.EditorState.createEmpty(),
    }
  }

  focus = ({toEnd} = {}) => {
    if (toEnd) {
      setTimeout(() => {
        this.setState(prevState => ({
          editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
        }))
        // https://labs.ft.com/2009/11/disappearing-text-cursor-in-firefox/
        this.editor.blur()
        this.editor.focus()
      })
    } else {
      this.editor.focus()
    }
  }

  getText = () => {
    return this.state.editorState.getCurrentContent().getPlainText()
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
    this.setState(prevState => {
      const es = prevState.editorState
      const content = es.getCurrentContent()
      const sel = es.getSelection()
      const newContent = D.Modifier.replaceText(content, sel, text)
      return {
        editorState: D.EditorState.push(es, newContent, 'insert-fragment'),
      }
    })
    return true
  }

  handleReturn = (e, editorState) => {
    Promise.resolve()
      .then(() =>
        this.props.onReturn(editorState.getCurrentContent().getPlainText())
      )
      .catch(err => {
        console.error(err)
      })
    return true
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {className, onReturn, style, ...props} = this.props
    return (
      <div
        className={className}
        style={Object.assign({}, style || {}, {
          display: 'inline-block',
          minWidth: '1em',
        })}
      >
        <D.Editor
          editorState={this.state.editorState}
          handleDrop={this.handleDrop}
          handleDroppedFiles={this.handleDroppedFiles}
          handlePastedFiles={this.handlePastedFiles}
          handlePastedText={this.handlePastedText}
          handleReturn={this.handleReturn}
          onChange={this.onChange}
          ref={e => this.editor = e}
          {...props}
        />
      </div>
    )
  }

  setText = (text, {clearUndoHistory} = {}) => {
    this.setState(prevState => {
      const content = D.ContentState.createFromText('' + text)
      let editorState
      if (clearUndoHistory) {
        editorState = D.EditorState.createWithContent(content)
      } else {
        editorState = D.EditorState.push(prevState.editorState, content, '')
      }

      return {
        editorState: editorState,
      }
    })
  }
}

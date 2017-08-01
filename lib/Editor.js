import D from 'draft-js'
import React from 'react'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: D.EditorState.createEmpty(),
    }
  }

  focus = () => {
    this.editor.focus()
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
    return (
      <div
        style={Object.assign({}, this.props.style || {}, {
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
          readOnly={this.props.readOnly}
          ref={e => this.editor = e}
        />
      </div>
    )
  }

  setText = (text) => {
    this.setState(prevState => {
      const content = D.ContentState.createFromText('' + text)
      const editorState = D.EditorState.push(prevState.editorState, content)
      return {
        editorState: editorState,
      }
    })
  }
}

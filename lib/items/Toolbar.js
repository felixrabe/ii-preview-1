import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

class Toolbar extends React.Component {
  state = {
    editorState: D.EditorState.createEmpty(),
  }

  componentDidMount() {
    this.editor.focus()
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

  handleReturn = (ev, editorState) => {
    console.log(editorState.getCurrentContent().getPlainText())
    return true
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    return (
      <div className='ii-toolbar'>
        <D.Editor
          editorState={this.state.editorState}
          handlePastedText={this.handlePastedText}
          handleReturn={this.handleReturn}
          onChange={this.onChange}
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
        />
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({

  }),
)(Toolbar)

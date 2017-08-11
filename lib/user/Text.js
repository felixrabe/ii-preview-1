import D from 'draft-js'
import React from 'react'

export default class Text extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: this.props.editorState || D.EditorState.createEmpty(),
    }
  }

  focus = (opt = {}) => {
    if (opt.toEnd) {
      setTimeout(() => {
        this.setState(prevState => ({
          editorState: D.EditorState.moveFocusToEnd(prevState.editorState),
        }))
        this.focus({toEnd: false})
      })
    } else {
      // https://labs.ft.com/2009/11/disappearing-text-cursor-in-firefox/
      this.editor.blur()
      this.editor.focus()
    }
  }

  onChange = (editorState) => {
    this.setState(() => {
      if (this.props.onChange) {
        setTimeout(() => this.props.onChange(this.getText()))
      }

      return {editorState: editorState}
    })
  }

  getText = () => {
    const editorState = this.state.editorState
    return editorState.getCurrentContent().getPlainText()
  }

  setText = (text) => {
    this.setState(prevState => {
      const content = D.ContentState.createFromText(text)
      return {
        editorState: D.EditorState.push(prevState.editorState, content, ''),
      }
    })
  }

  render() {
    return (
      <div className='user-text core-padding' onClick={this.focus}>
        <div onClick={e => e.stopPropagation()}>
          <D.Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={e => this.editor = e}
          />
        </div>
      </div>
    )
  }
}

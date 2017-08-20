import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import Interpreter from '../iilang/Interpreter'

const emptyContent = D.ContentState.createFromText('')

class Command extends React.Component {
  state = {
    editorState: D.EditorState.createEmpty(),
  }

  componentWillMount() {
    this.setupInterpreter()
  }

  componentDidMount() {
    this.focus()
  }

  componentWillReceiveProps(nextProps) {
    this.setupInterpreter()
  }

  setupInterpreter() {
    this.interpreter = new Interpreter(this.props.state, this.props.dispatch)
  }

  focus = ({toEnd} = {}) => {
    if (toEnd) {
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
    const text = editorState.getCurrentContent().getPlainText()
    this.interpreter.interpret(text)
    editorState = D.EditorState.push(editorState, emptyContent, '')
    this.setState({editorState}, () => this.focus({toEnd: true}))
    return true
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    return (
      <div className='ii-command' onClick={() => this.editor.focus()}>
        <div onClick={ev => ev.stopPropagation()}>
          <D.Editor
            editorState={this.state.editorState}
            handlePastedText={this.handlePastedText}
            handleReturn={this.handleReturn}
            onChange={this.onChange}
            readOnly={this.state.isProcessingCommand}
            ref={e => this.editor = e}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    state: state,
  }),
  dispatch => ({
    dispatch: dispatch
  }),
)(Command)

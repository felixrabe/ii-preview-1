import D from 'draft-js'
import processCommand from './processCommand'
import React from 'react'
import ReactDOM from 'react-dom'
import renderCommandMenuItems from './renderCommandMenuItems'
import renderErrorAsMenuItem from './renderErrorAsMenuItem'
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
      <UI.Menu>
        {renderCommandMenuItems([  // order by intuition
          ['remove', 'Remove'],
        ], this.processCommand)}
        {renderErrorAsMenuItem(this.state.error, () => {
          console.log(this.state.error)
          this.setState({error: null})
        })}
      </UI.Menu>
    </UI.TextArea>
  )
}

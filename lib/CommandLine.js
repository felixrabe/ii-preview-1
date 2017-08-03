import React from 'react'

import {cs} from './Colors'
import CommandHistory from './CommandHistory'
import Editor from './Editor'

export default class CommandLine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isProcessingCommand: false,
    }

    this.cmdHistory = new CommandHistory()
    if (localStorage.getItem('history')) {
      this.loadHistory()
    }

    window.onbeforeunload = () => {
      this.saveHistory()
    }

    this._isMounted = false
  }

  componentDidMount() {
    this.focus()
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  focus = (opt = {}) => {
    this.editor.focus(opt)
  }

  loadHistory = () => {
    const plainHistory = JSON.parse(localStorage.getItem('history'))
    this.cmdHistory = Object.assign(new CommandHistory(), plainHistory)
  }

  saveHistory = () => {
    const jsonHistory = JSON.stringify(this.cmdHistory)
    setTimeout(() => localStorage.setItem('history', jsonHistory))
  }

  onDownArrow = () => {
    this.editor.setText(this.cmdHistory.down(), {clearUndoHistory: true})
    this.focus({toEnd: true})
  }

  _onReturn = async (text, mutableOptions = {}) => {
    let error = null
    try {
      await this.props.onReturn(text, mutableOptions)
    } catch (err) {
      error = err
    }

    if (this._isMounted === false) {
      if (error !== null) {
        console.error(error)
      }

      throw new Error('nothing serious, just gotta escape this mess')
    }

    return error
  }

  onReturn = async (text) => {
    this.setState({
      error: null,
      isProcessingCommand: true,
    })

    const mutableOptions = {keepCommand: false}
    const error = await this._onReturn(text, mutableOptions)

    this.setState({
      error: error,
      isProcessingCommand: false,
    })

    if (error === null) {
      this.cmdHistory.push(text)
      if (mutableOptions.keepCommand) {
        this.cmdHistory.up()
      } else {
        this.editor.setText('', {clearUndoHistory: true})
      }
    }

    this.focus({toEnd: !mutableOptions.keepCommand})
  }

  onUpArrow = () => {
    this.editor.setText(this.cmdHistory.up(), {clearUndoHistory: true})
    this.focus({toEnd: true})
  }

  render() {
    return (
      <div
        className='command-line'
        onClick={this.focus}
        style={Object.assign({}, this.props.style || {}, {
          backgroundColor: cs.commandLineBG,
          borderRadius: '10px',
          boxShadow: '3px 3px 3px ' + cs.boxShadow,
          color: cs.commandLineFG,
          height: '100%',
          overflow: 'hidden',
          padding: '0.8em',
        })}
      >
        <style>{`
          .command-line ::selection {
            background-color: ${cs.commandLineSelBG.sel};
            color: ${cs.commandLineSelFG};
            opacity: 1.0;
          }
          .command-line ::-moz-selection {
            background-color: ${cs.commandLineSelBG};
            color: ${cs.commandLineSelFG};
            opacity: 1.0;
          }
        `}</style>
        <Editor
          className='command-line-editor not-draggable'
          onDownArrow={this.onDownArrow}
          onReturn={this.onReturn}
          onUpArrow={this.onUpArrow}
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
          style={{
            width: '100%',
          }}
        />
        {this.state.error && (
          <div
            onClick={() => {
              console.error(this.state.error)
              this.setState({error: null})
            }}
            style={{
              color: cs.errorFG,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {this.state.error.toString()}
          </div>
        )}
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

import CommandHistory from './CommandHistory'
import Editor from './Editor'

const SKIP_UNMOUNTED_PROCESSING = {}

export default class CommandLine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isProcessingCommand: false,
    }

    this.cmdHistory = new CommandHistory()

    window.onbeforeunload = () => {
      this.saveHistory()
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    if (this.context.storage.hasItem('history')) {
      this.loadHistory()
    } else {
      this.focus()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  focus = (opt = {}) => {
    this.editor.focus(opt)
  }

  loadHistory = async () => {
    const plainHistory = await this.context.storage.getItem('history')
    this.cmdHistory = Object.assign(new CommandHistory(), plainHistory)
    this.editor.setText(this.cmdHistory.get(), {clearUndoHistory: true})
    this.focus({toEnd: true})
  }

  saveHistory = () => {
    // TODO: Why setTimeout?
    setTimeout(() => this.context.storage.setItem('history', this.cmdHistory))
  }

  onDownArrow = () => {
    this.editor.setText(this.cmdHistory.down(), {clearUndoHistory: true})
    this.focus({toEnd: true})
  }

  _onReturn_callPropsOnReturn = async (text, mutableOptions = {}) => {
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

      return SKIP_UNMOUNTED_PROCESSING
    }

    return error
  }

  _onReturn_processCommand = async (text, mutableOptions) => {
    this.setState({
      error: null,
      isProcessingCommand: true,
    })

    const error = await this._onReturn_callPropsOnReturn(text, mutableOptions)

    if (error !== SKIP_UNMOUNTED_PROCESSING) {
      this.setState({
        error: error,
        isProcessingCommand: false,
      })
    }

    return error
  }

  onReturn = async (text) => {
    const mutableOptions = {keepCommand: false}

    const error = await this._onReturn_processCommand(text, mutableOptions)

    if (error !== SKIP_UNMOUNTED_PROCESSING) {
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
      >
        <Editor
          className='command-line-editor'
          onDownArrow={this.onDownArrow}
          onReturn={this.onReturn}
          onUpArrow={this.onUpArrow}
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
        />
        {this.state.error && (
          <div
            className='command-line-error'
            onClick={() => {
              console.error(this.state.error)
              this.setState({error: null})
            }}
          >
            {this.state.error.toString()}
          </div>
        )}
      </div>
    )
  }
}

CommandLine.contextTypes = {
  storage: PropTypes.object.isRequired,
}

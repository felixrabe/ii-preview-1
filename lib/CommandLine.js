import React from 'react'

import {cs} from './Colors'
import Editor from './Editor'

export default class CommandLine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isProcessingCommand: false,
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

  focus = () => {
    this.editor.focus()
  }

  _onReturn = async (text) => {
    let error = null
    try {
      await this.props.onReturn(text)
    } catch (err) {
      error = err
    }

    if (this._isMounted === false) {
      if (error !== null) {
        console.error(error)
      }

      throw new Error('nothing serious, just gotta escape this mess')
    }

    error === null && this.editor.setText('')

    return error
  }

  onReturn = async (text) => {
    this.setState({
      error: null,
      isProcessingCommand: true,
    })

    const error = await this._onReturn(text)

    this.setState({
      error: error,
      isProcessingCommand: false,
    })

    this.focus()
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
          className='command-line-editor'
          onReturn={this.onReturn}
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
          style={{
            width: '100%'
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

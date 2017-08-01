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
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    return (
      <div
        className='command-line'
        onClick={this.focus}
        style={Object.assign({}, this.props.style || {}, {
          backgroundColor: cs.commandLineBG,
          color: cs.commandLineFG,
          cursor: 'text',
          opacity: 1,
          padding: '0.5em',
        })}
      >
        <style>{`
          .command-line ::selection {
            background-color: ${cs.commandLineSelBG};
            color: ${cs.commandLineSelFG};
            opacity: 1.0;
          }
          .command-line ::-moz-selection {
            background-color: ${cs.commandLineSelBG};
            color: ${cs.commandLineSelFG};
            opacity: 1.0;
          }
        `}</style>
        <span className='fa-stack'>
          <i className='fa fa-square fa-stack-2x' />
          <i className='fa fa-terminal fa-stack-1x' style={{color: cs.commandLineBG}} />
        </span>
        {' '}
        <Editor
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
        />
      </div>
    )
  }
}

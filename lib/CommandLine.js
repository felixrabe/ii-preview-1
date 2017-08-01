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

  componentDidMount() {
    this.focus()
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
          alignSelf: 'center',
          backgroundColor: cs.commandLineBG,
          borderRadius: '10px',
          color: cs.commandLineFG,
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridAutoRows: '1fr',
          height: '50vh',
          justifySelf: 'center',
          opacity: 0.9,
          overflow: 'hidden',
          padding: '0.5em',
          width: '50vw',
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
          readOnly={this.state.isProcessingCommand}
          ref={e => this.editor = e}
          style={{
            alignSelf: 'center',
            justifySelf: 'center',
            zIndex: 100,
          }}
        />
      </div>
    )
  }
}

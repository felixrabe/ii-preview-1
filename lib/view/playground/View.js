import D from 'draft-js'
import React from 'react'

const cl = (...nn) =>
  nn({className: nn.map(n => 'ii-playground-' + n).join(' ')})

export default class PlaygroundView extends React.Component {
  constructor(props) {
    super(props)

    const editorState =

    this.setState({
      editorState: editorState,
    })
  }

  render() {
    return (
      <div>
        <div {...cl('data')} onClick={this.focus}>
          <div onClick={e => e.stopPropagation()}>
            <D.Editor
              editorState={this.state.editorState}
              onChange={editorState => this.setState({editorState})}
              ref={e => this.editor = e}
            />
          </div>
        </div>

      </div>
    )
  }
}

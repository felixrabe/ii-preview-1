import D from 'draft-js'
import React from 'react'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: D.EditorState.createEmpty(),
    }
  }

  focus = () => {
    this.editor.focus()
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    return (
      <div
        style={Object.assign({}, this.props.style || {}, {
          display: 'inline-block',
          minWidth: '1em',
        })}
      >
        <D.Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          readOnly={this.props.readOnly}
          ref={e => this.editor = e}
        />
      </div>
    )
  }
}
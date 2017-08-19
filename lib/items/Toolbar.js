import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

class Toolbar extends React.Component {
  state = {
    editorState: D.EditorState.createWithContent(D.ContentState.createFromText('abc\ndef\nghi')),
  }

  componentDidMount() {
    this.editor.focus()
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    return (
      <div className='ii-toolbar'>
        <D.Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={e => this.editor = e}
        />
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({

  }),
)(Toolbar)

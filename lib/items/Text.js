import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

class Text extends React.Component {
  state = {
    editorState: D.EditorState.createEmpty(),
  }

  componentDidMount() {
    this.editor.focus()
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render() {
    return (
      <div className='ii-text'>
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
)(Text)

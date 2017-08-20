import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'

import TextItem from './TextItem'

const editorStateFromText = (text) => (
  D.EditorState.moveSelectionToEnd(
    D.EditorState.createWithContent(
      D.ContentState.createFromText(text || '')
    )
  )
)

class Text extends React.Component {
  render() {
    return (
      <div className='ii-text' onClick={() => this.editor.focus()}>
        <div onClick={ev => ev.stopPropagation()}>
          <D.Editor
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            ref={e => this.editor = e}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const editorState = ownProps.item.editorState ||
      editorStateFromText(ownProps.item.text)
    return {editorState}
  },
  (dispatch, ownProps) => ({
    onChange: editorState => dispatch(
      actions.updateItems({
        [ownProps.item.name]: new TextItem(
          {...ownProps.item, editorState}
        ),
      })
    ),
  }),
)(Text)

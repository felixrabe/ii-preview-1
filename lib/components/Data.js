import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/actions'
import getEditorState from '../selectors/getEditorState'
import getIsReadOnly from '../selectors/getIsReadOnly'
import getPath from '../selectors/getPath'

const Data = ({path, editorState, onChange, readOnly}) => (
  <div className='ii-data'>
    <D.Editor
      editorState={editorState}
      onChange={editorState => onChange(path, editorState)}
      readOnly={readOnly}
    />
  </div>
)

export default connect(
  state => ({
    editorState: getEditorState(state),
    path: getPath(state),
    readOnly: getIsReadOnly(state),
  }),
  dispatch => ({
    onChange: (path, editorState) => dispatch(actions.updateEditor(path, editorState)),
  }),
)(Data)

import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'

const Editor = ({editorState, onChange}) => (
  <D.Editor
    editorState={editorState}
    onChange={onChange}
  />
)

export default connect(
  state => state,
  dispatch => ({onChange: es => dispatch(actions.updateEditorState(es))})
)(Editor)

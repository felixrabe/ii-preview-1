import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'
import Editor from './Editor'

export default connect(
  state => ({
    editorState: D.EditorState.createWithContent(D.convertFromRaw(state.inputState)),
  }),
  dispatch => ({
    onChange: editorState => dispatch(actions.setInput(D.convertToRaw(editorState.getCurrentContent()))),
  }),
)(Editor)

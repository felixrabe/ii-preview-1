import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'
import Editor from './Editor'

export default connect(
  state => (console.log('state to props'), {
    editorState: D.EditorState.createWithContent(D.convertFromRaw(state.inputState)),
  }),
  dispatch => (console.log('dispatch to props'), {
    onChange: editorState => (console.log('onChange dispatch'), dispatch(actions.setInput(D.convertToRaw(editorState.getCurrentContent())))),
  }),
)(Editor)

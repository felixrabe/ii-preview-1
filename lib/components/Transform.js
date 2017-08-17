import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/index'
import Editor from './Editor'

export default connect(
  state => ({
    editorState: state.transformState,
  }),
  dispatch => ({
    onChange: editorState => dispatch(actions.setTransformState(editorState)),
  }),
)(Editor)

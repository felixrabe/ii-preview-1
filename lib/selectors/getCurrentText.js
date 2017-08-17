import {createSelector} from 'reselect'

import getEditorState from './getEditorState'

const getCurrentText = createSelector(
  [getEditorState],
  (editorState) => editorState.getCurrentContent().getPlainText(),
)

export default getCurrentText

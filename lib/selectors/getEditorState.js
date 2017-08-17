import D from 'draft-js'
import {createSelector} from 'reselect'

import getOriginalText from './getOriginalText'
import getPathStr from './getPathStr'

const getEditorState = createSelector(
  [state => state.editors[getPathStr(state)], getOriginalText],
  (editor, originalText) => {
    if (editor) {
      return editor.editorState
    } else {
      return D.EditorState.createWithContent(
        D.ContentState.createFromText(originalText)
      )
    }
  },
)

export default getEditorState

import D from 'draft-js'

import getData from './getData'

const getEditorState = (state) => (
  D.EditorState.createWithContent(
    D.ContentState.createFromText(
      JSON.stringify(getData(state), null, 2)
    )
  )
)

export default getEditorState

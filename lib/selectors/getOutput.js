import {createSelector} from 'reselect'

const transform = (inputText) => {
  console.log('transform', inputText)
  return `(${inputText})`
}

const getOutput = createSelector(
  [state => state.inputState],
  (inputState) => transform(
    inputState.getCurrentContent().getPlainText(),
  ),
)

export default getOutput

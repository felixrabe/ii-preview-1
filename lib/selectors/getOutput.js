import {createSelector} from 'reselect'

const transform = (inputText, transformText) => {
  return `${transformText}(${inputText})`
}

const getOutput = createSelector(
  [state => state.inputState, state => state.transformState],
  (inputState, transformState) => transform(
    inputState.getCurrentContent().getPlainText(),
    transformState.getCurrentContent().getPlainText(),
  ),
)

export default getOutput

import TextBlock from './TextBlock'

import './CodeBlock.css'

export default class CodeBlock extends TextBlock {
  constructor(props) {
    super(props)
  }

  additionalCommands = () => {
    return [
      ['run', 'Run'],
    ]
  }
}

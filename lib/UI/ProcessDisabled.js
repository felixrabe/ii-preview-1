import ProcessFlags from './ProcessFlags'

import './ProcessDisabled.css'

export default (props) => {
  return ProcessFlags(props, {disabled: 'ui-disabled'})
}

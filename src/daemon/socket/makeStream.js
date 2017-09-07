import multipipe from 'multipipe'

import ExecCLITransform from './ExecCLITransform'
import InLinesTransform from './stream/InLinesTransform'
import JSONToObjTransform from './stream/JSONToObjTransform'

const makeStream = () => multipipe(
  new InLinesTransform(),
  new JSONToObjTransform(),
  new ExecCLITransform(),
)

export default makeStream

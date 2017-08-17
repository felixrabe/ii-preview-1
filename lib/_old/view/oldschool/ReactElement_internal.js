/* eslint-disable max-len */

// https://github.com/facebook/react/blob/357925a84e34d17b96568e67d30baeb2a399da11/src/isomorphic/classic/element/ReactElement.js#L23
const REACT_ELEMENT_TYPE = (
  typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')
) || 0xeac7

// https://github.com/facebook/react/blob/357925a84e34d17b96568e67d30baeb2a399da11/src/isomorphic/classic/element/ReactElement.js#L375
export const isValidElement = (object) => (
  typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
)

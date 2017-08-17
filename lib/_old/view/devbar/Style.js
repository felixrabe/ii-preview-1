const dark = '#222'
const bright = '#ddd'

export default {
  DevBar: {
    backgroundColor: dark,
    color: bright,
    fontFamily: 'sans-serif',
    fontSize: '1.2rem',
    opacity: 0.8,
    padding: '4px',
    position: 'absolute',
    right: '0px',
    top: '50vh',
    width: '200px',
  },
  DevBarDragHandle: {
    cursor: 'move',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    textAlign: 'center',
    userSelect: 'none',
  },
  DevBarEditor: {
    backgroundColor: bright,
    color: dark,
  },
  DevBarCmd: {
    cursor: 'pointer',
    userSelect: 'none',
  },
}

import {colors, spacing} from '../components/Style'

export const styleCSS = `
  .ii-world {
    background-color: ${colors.background};
    height: 100%;
    padding: ${spacing/6}px;
    overflow: hidden;
  }

  .ii-world-miniitem {
    background-color: ${colors.itemBackground};
    border-radius: 2px;
    color: ${colors.itemText};
  }
`

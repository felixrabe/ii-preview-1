import {colors, spacing} from '../components/Style'

export const padding = spacing / 6

export const styleCSS = `
  .ii-world {
    background-color: ${colors.background};
    cursor: pointer;
    height: 100%;
    padding: ${padding}px;
    overflow: hidden;
  }

  .ii-world-miniitem {
    background-color: ${colors.itemBackground};
    border-radius: 2px;
    color: ${colors.itemText};
  }
`

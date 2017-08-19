import Color from 'color'

export const spacing = 5

const colors = {
  background: Color('#c0c0c0'),
  gridPlaceholder: Color('#303030'),
  item: Color('#f0f0f0'),
  text: Color('#404040'),
}

export const styleCSS = `
  .ii-app {
    height: 100%;
  }

  .ii-layout {
    background-color: ${colors.background};
    height: 100%;
    overflow: auto;
  }

  .ii-layout-init .react-grid-item {
    transition: none;
  }

  .ii-layout-item-outer {
    background-color: ${colors.item};
    border-radius: ${spacing}px;
  }

  .ii-layout-item-outer .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .ii-layout-item {
    border-radius: ${spacing}px;
    height: 100%;
    overflow: auto;
  }

  .react-grid-placeholder {
    background-color: ${colors.gridPlaceholder};
    border-radius: ${spacing}px;
    opacity: 0.1;
    z-index: 1000;
  }
`

import Color from 'color'

export const spacing = 5

const colors = {
  background: Color('#c0c0c0'),
  gridPlaceholder: Color('#303030'),
  item: Color('#f0f0f0'),
  text: Color('#404040'),
}

export const styleCSS = `
  /* https://css-tricks.com/snippets/css/system-font-stack/ */
  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src:
      local(".SFNSText-Light"),
      local(".HelveticaNeueDeskInterface-Light"),
      local(".LucidaGrandeUI"),
      local("Ubuntu Light"),
      local("Segoe UI Light"),
      local("Roboto-Light"),
      local("DroidSans"),
      local("Tahoma");
  }

  .ii-app {
    font-family: system;
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
    color: ${colors.text};
  }

  .ii-layout-item-outer .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .ii-layout-item-inner {
    height: 100%;
    overflow: auto;
    padding: ${spacing}px;
  }

  .react-grid-placeholder {
    background-color: ${colors.gridPlaceholder};
    border-radius: ${spacing}px;
    opacity: 0.1;
    z-index: 1000;
  }
`

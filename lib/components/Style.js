import Color from 'color'

export const spacing = 6

const colors = {}

colors.background = Color('#c0c0c0')
colors.gridPlaceholder = Color('#303030').fade(0.9)
colors.itemShadow = Color('#303030').fade(0.8)
colors.itemBackground = Color('#f8f8f8')
colors.itemText = Color('#282828')
colors.itemHeader = colors.itemBackground.darken(0.1)
colors.itemHeaderText = colors.itemText.mix(colors.itemHeader, 0.2)

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
    background-color: ${colors.itemHeader};
    border-radius: ${spacing}px;
    box-shadow: 1px 2px 6px ${colors.itemShadow};
    color: ${colors.itemText};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .ii-layout-item-outer .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .ii-layout-item-header {
    color: ${colors.itemHeaderText};
    cursor: default;
    padding: 1px ${spacing}px;
    user-select: none;
  }

  .ii-layout-item-header.ii-layout-draggable {
    cursor: move;
  }

  .ii-layout-item-inner {
    background-color: ${colors.itemBackground};
    overflow: auto;
  }

  .ii-layout .react-grid-placeholder {
    background-color: ${colors.gridPlaceholder};
    border-radius: ${spacing}px;
    opacity: 1;
    z-index: 1000;
  }
`

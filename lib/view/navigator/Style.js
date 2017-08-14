import Color from 'color'

const background = Color('#f0f0f0')
const foreground = Color('#484848')
const padding = 6

export default `
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

  .idev-navigator {
    background-color: ${background};
    color: ${foreground};
    display: grid;
    font-family: system;
    grid-template-rows: min-content;
    height: 100%;
  }

  .idev-navigator-body {
    display: grid;
    overflow: auto;
  }

  .idev-navigator-nav {
    align-items: baseline;
    background-color: ${foreground};
    color: ${background};
    display: flex;
    flex-direction: row;
    padding: ${padding}px;
  }

  .idev-navigator-navitem {
  }

  .idev-navigator-root {
    opacity: 0.8;
  }

  .idev-navigator-relpath {
    cursor: pointer;
    user-select: none;
  }

  .idev-navigator-datatype {
    font-size: 0.8rem;
    font-style: italic;
    opacity: 0.8;
    padding-left: ${padding}px;
  }

  .idev-navigator-action {
    cursor: pointer;
    padding-left: ${padding}px;
    user-select: none;
  }

  .idev-navigator-dir,
  .idev-navigator-data {
    padding: ${padding}px;
  }

  .idev-navigator-dir {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .idev-navigator-diritem {
    cursor: pointer;
    display: inline-block;
    user-select: none;
  }

  .idev-navigator-data {
    background-color: white;
    border-top: 4px solid #999;
    white-space: pre;
  }
`

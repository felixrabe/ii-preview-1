import Color from 'color'

const background = Color('#f0f0f0')
const foreground = Color('#484848')
const padding = 8

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
    background-color: ${background};
    color: ${foreground};
    display: grid;
    font-family: system;
    grid-template-rows: min-content;
    height: 100%;
    padding: ${padding};
  }
`

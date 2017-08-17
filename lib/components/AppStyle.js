import Color from 'color'

const background = Color('#f8f8f8')
const foreground = Color('#343434')
const path = Color('#aa3333')
const dir = Color('#339933')
const data = Color('#3333aa')
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
    grid-gap: ${padding}px;
    grid-template-rows: repeat(3, min-content);
    height: 100%;
    padding: ${padding}px;
  }

  .ii-top {
  }

  .ii-path {
    color: ${path};
    display: inline-block;
  }

  .ii-path-link-modified {
    text-decoration: underline;
  }

  .ii-dir {
    color: ${dir};
    display: inline-block;
  }

  .ii-data {
    color: ${data};
  }
`

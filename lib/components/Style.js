import Color from 'color'

export const spacing = 6

export const colors = {}

export const styleCSS = `
  .ii-app {
    display: grid;
    font-family: system-ui;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }

  .ii-app > div {
    overflow: auto;
  }

  .ii-app nav ul {
    padding: 0px;
  }

  .ii-app nav ul li {
    display: inline-block;
    list-style: none;
    margin-right: ${spacing}px;
  }
`

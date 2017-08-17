import {ts} from './StyleVars'

export const style = `
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

  html {
    font-size: 16px;
  }

  .ii-app {
    background-color: ${ts.background};
    font-family: system;
    font-size: 1rem;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ii-app.ii-animate-none .react-grid-item {
    transition: none;
  }

  .ii-app .ii-obj {
    background-color: ${ts.normalBG};
    border-radius: 5px;
    box-shadow: 1px 2px 6px ${ts.shadow};
    color: ${ts.normalFG};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .ii-app .ii-obj.react-grid-item .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .ii-app .react-grid-placeholder {
    background-color: ${ts.black[2]};
    border-radius: 5px;
    opacity: 0.3;
  }

  .ii-app .ii-obj-header {
    background-color: ${ts.headerBG};
    color: ${ts.headerFG};
    cursor: default;
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    font-weight: normal;
    user-select: none;
    white-space: pre;
  }

  .ii-app .ii-obj-header-item {
    flex: 0 0 auto;
    padding: 0px ${ts.padding};
  }

  .ii-app .ii-obj-header-space {
    flex: 1 0 auto;
  }

  .ii-app .ii-obj-command {
    cursor: pointer;
    user-select: none;
  }

  .ii-app .ii-obj-command:hover {
    color: ${ts.headerFGHover};
  }

  .ii-app .ii-obj-body {
    display: grid;
    grid-auto-rows: max-content;
    overflow: auto;
  }

  .ii-app .ii-padding {
    padding: ${ts.padding};
  }

  .ii-app .ii-padding-top-bottom {
    padding-bottom: ${ts.padding};
    padding-top: ${ts.padding};
  }

  .ii-app .ii-repr {
    font-style: italic;
  }

  .ii-app .ii-scope {
    align-content: flex-start;
    align-items: baseline;
    display: flex;
    flex-flow: row wrap;
    line-height: 1.2;
  }

  .ii-app .ii-scope-hidden-obj {
    cursor: pointer;
    padding: 0px ${ts.padding};
    user-select: none;
  }

  .ii-app .ii-command-line {
    background-color: ${ts.commandLineBG};
    color: ${ts.commandLineFG};
  }

  .ii-app .ii-command-line ::selection {
    background-color: ${ts.commandLineSelBG.sel};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .ii-app .ii-command-line ::-moz-selection {
    background-color: ${ts.commandLineSelBG};
    color: ${ts.commandLineSelFG};
    opacity: 1.0;
  }

  .ii-app .ii-command-line-editor {
    width: 100%;
  }

  .ii-app .ii-command-line-error {
    color: ${ts.errorFG};
    cursor: pointer;
    font-weight: bold;
    user-select: none;
  }

  .ii-app .ii-editor {
    display: inline-block;
    min-width: 1em;
  }


  /* user */


`

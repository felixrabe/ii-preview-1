import Color from 'color'

const itemShadowActive = Color('#303030').fade(0.7)
const itemShadowInactive = Color('#303030').fade(1)

export const styleCSS = `
  .ii-overlay {
    background-color: #666;
    height: 100%;
    left: 0px;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0px;
    transition: opacity 200ms;
    width: 100%;
  }

  body.ii-overlay-active .ii-overlay {
    opacity: 0.3;
  }

  #app-root {
    transition: filter 200ms;
  }

  body.ii-overlay-active #app-root {
    filter: blur(3px) contrast(60%);
  }

  .ii-window {
    background-color: #f0f0f0;
    border: 2px solid #999;
    border-radius: 5px;
    bottom: 30px;
    box-shadow: 1px 2px 5px ${itemShadowInactive};
    height: 120px;
    opacity: 0.5;
    padding: 6px;
    position: absolute;
    right: 30px;
    transition: box-shadow 200ms, opacity 200ms;
    width: 120px;
  }

  body.ii-overlay-active .ii-window {
    box-shadow: 1px 2px 5px ${itemShadowActive};
    opacity: 0.8;
  }
`

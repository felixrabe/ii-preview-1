// Palette history:
// http://paletton.com/#uid=70Y1X0kkOaei4rciqgin+5osx1N
// http://paletton.com/#uid=70Y1X0k7Lc16MwP8Wl3bJ5shH2L
// http://paletton.com/#uid=70Y1T0koNnEdKPmjGuJuhdcyn3V
// http://paletton.com/#uid=70Y1T0ktswI4yW5jsDQ-UmhSo8A
// http://paletton.com/#uid=70Y1T0kuGvG3KRDgSEkGWixVN4J
// http://paletton.com/#uid=60Z0P0kkfjZ3JTBb+tvsmbCNk2j
// http://paletton.com/#uid=61f180k8njb0nX54Fs3d2a3pv6g
// http://paletton.com/#uid=61f180k9oi029Wg6Br0dm8Vmj4E
// http://paletton.com/#uid=61f180khRp68lUydezPn7g0rT66
// http://paletton.com/#uid=61f180kn9n92rLecPuMv3fzTX6s

/* eslint-disable max-len */

// Copy-paste from Paletton.com via 'Tables / Export...' > 'Color swatches' > 'as Sketch Palette'
const palettonExport = {'compatibleVersion': '1.4', 'pluginVersion': '1.5', 'colors': [{'red': 0.72156862745098, 'green': 0.60392156862745, 'blue': 0.2, 'alpha': 1}, {'red': 1, 'green': 0.9843137254902, 'blue': 0.92549019607843, 'alpha': 1}, {'red': 0.96078431372549, 'green': 0.87450980392157, 'blue': 0.57647058823529, 'alpha': 1}, {'red': 0.48627450980392, 'green': 0.37647058823529, 'blue': 0.015686274509804, 'alpha': 1}, {'red': 0.2, 'green': 0.15686274509804, 'blue': 0, 'alpha': 1}, {'red': 0.50588235294118, 'green': 0.67450980392157, 'blue': 0.18823529411765, 'alpha': 1}, {'red': 0.94117647058824, 'green': 0.96470588235294, 'blue': 0.89411764705882, 'alpha': 1}, {'red': 0.77254901960784, 'green': 0.89411764705882, 'blue': 0.53725490196078, 'alpha': 1}, {'red': 0.30196078431373, 'green': 0.45098039215686, 'blue': 0.011764705882353, 'alpha': 1}, {'red': 0.12156862745098, 'green': 0.18823529411765, 'blue': 0, 'alpha': 1}, {'red': 0.72156862745098, 'green': 0.28235294117647, 'blue': 0.2, 'alpha': 1}, {'red': 1, 'green': 0.93725490196078, 'blue': 0.92549019607843, 'alpha': 1}, {'red': 0.96078431372549, 'green': 0.63529411764706, 'blue': 0.57647058823529, 'alpha': 1}, {'red': 0.48627450980392, 'green': 0.086274509803922, 'blue': 0.015686274509804, 'alpha': 1}, {'red': 0.2, 'green': 0.031372549019608, 'blue': 0, 'alpha': 1}, {'red': 0.21176470588235, 'green': 0.18823529411765, 'blue': 0.50196078431373, 'alpha': 1}, {'red': 0.8, 'green': 0.79607843137255, 'blue': 0.85098039215686, 'alpha': 1}, {'red': 0.45490196078431, 'green': 0.43921568627451, 'blue': 0.67058823529412, 'alpha': 1}, {'red': 0.074509803921569, 'green': 0.054901960784314, 'blue': 0.33725490196078, 'alpha': 1}, {'red': 0.015686274509804, 'green': 0.003921568627451, 'blue': 0.14117647058824, 'alpha': 1}, {'red': 1, 'green': 1, 'blue': 1, 'alpha': 1}, {'red': 0, 'green': 0, 'blue': 0, 'alpha': 1}]}

/* eslint-enable max-len */

class Color {
  static _asel(a) {
    return Math.min(0.99, a)  // https://stackoverflow.com/a/7224621
  }

  static fromHsla(h, s, l, a) {
    const normal = 'hsla(' + [h, s, l, a].join(',') + ')'
    const sel = 'hsla(' + [h, s, l, Color._asel(a)].join(',') + ')'
    return new Color({normal, sel})
  }

  static fromRgba(r, g, b, a) {
    const normal = 'rgba(' + [r, g, b, a].join(',') + ')'
    const sel = 'rgba(' + [r, g, b, Color._asel(a)].join(',') + ')'
    return new Color({normal, sel})
  }

  constructor({normal, sel}) {
    this.normal = normal
    this.sel = sel
  }

  toString = () => {
    return this.normal
  }
}

let colors = palettonExport.colors.slice()

export const colorTable = [...Array(4)].map(() =>
  [...Array(5)].map(() => {
    const v = colors.shift()
    const [r, g, b] = [v.red, v.green, v.blue].map(x => x * 100 + '%')
    return Color.fromRgba(r, g, b, v.alpha)

    // Remap columns from light to dark: 1 2 0 3 4  (inverse: 2 0 1 3 4)
  }).reduce((r, v, i) => (r[{0: 2, 1: 0, 2: 1, 3: 3, 4: 4}[i]] = v, r), [])
)

colorTable.push(
  [95, 75, 50, 28, 10].map(n => Color.fromHsla('0', '0%', n + '%', 1))
)

export const tc = {  // colors
  primary: colorTable[0],
  good: colorTable[1],
  bad: colorTable[2],
  complement: colorTable[3],
  black: colorTable[4],
}

export const ts = {  // semantics
  ...tc,
  normalBG: tc.black[0],
  normalFG: tc.black[4],
  normalFGHover: tc.black[3],
  errorFG: tc.bad[2],

  boxShadow: 'hsla(0,0%,0%,0.2)',
  padding: '6px',

  commandLineBG: tc.primary[0],
  commandLineFG: tc.primary[4],
  commandLineSelBG: tc.primary[2],
  commandLineSelFG: tc.primary[0],

  headerFG: tc.primary[0],
  headerFGHover: tc.primary[1],
  headerBG: tc.primary[2],
}

export const style = `
  .app {
    background-color: ${ts.normalBG};
    font-family: sans-serif;
    font-size: 1em;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .app.animate-none .react-grid-item {
    transition: none;
  }

  .app .obj-frame {
    background-color: ${ts.normalBG};
    border-radius: 5px;
    box-shadow: 1px 2px 6px ${ts.boxShadow};
    color: ${ts.normalFG};
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
  }

  .app .obj-frame.react-grid-item > .react-resizable-handle {
    background: none;
    cursor: nwse-resize;
  }

  .app .obj-header {
    background-color: ${ts.headerBG};
    color: ${ts.headerFG};
    cursor: default;
    font-size: 0.9em;
    font-weight: bold;
    padding: 0px ${ts.padding};
    user-select: none;
    white-space: pre;
  }

  .app .obj-command:hover {
    color: ${ts.headerFGHover};
  }

  .app .obj-command, .link {
    cursor: pointer;
    user-select: none;
  }

  .app .link:hover {
    color: ${ts.normalFGHover};
  }
`

// Palette history:
// http://paletton.com/#uid=70Y1X0kkOaei4rciqgin+5osx1N
// http://paletton.com/#uid=70Y1X0k7Lc16MwP8Wl3bJ5shH2L
// http://paletton.com/#uid=70Y1T0koNnEdKPmjGuJuhdcyn3V
// http://paletton.com/#uid=70Y1T0ktswI4yW5jsDQ-UmhSo8A
// http://paletton.com/#uid=70Y1T0kuGvG3KRDgSEkGWixVN4J

/* eslint-disable max-len */

// Copy-paste from Paletton.com via 'Tables / Export...' > 'Color swatches' > 'as Sketch Palette'
const palettonExport = {'compatibleVersion': '1.4', 'pluginVersion': '1.5', 'colors': [{'red': 0.98823529411765, 'green': 0.67843137254902, 'blue': 0.03921568627451, 'alpha': 1}, {'red': 1, 'green': 0.96078431372549, 'blue': 0.88235294117647, 'alpha': 1}, {'red': 1, 'green': 0.82745098039216, 'blue': 0.47450980392157, 'alpha': 1}, {'red': 0.58039215686275, 'green': 0.38823529411765, 'blue': 0, 'alpha': 1}, {'red': 0.14901960784314, 'green': 0.098039215686275, 'blue': 0, 'alpha': 1}, {'red': 0.031372549019608, 'green': 0.78039215686275, 'blue': 0.082352941176471, 'alpha': 1}, {'red': 0.82745098039216, 'green': 0.93725490196078, 'blue': 0.83529411764706, 'alpha': 1}, {'red': 0.4, 'green': 0.84705882352941, 'blue': 0.43137254901961, 'alpha': 1}, {'red': 0, 'green': 0.45490196078431, 'blue': 0.031372549019608, 'alpha': 1}, {'red': 0, 'green': 0.11764705882353, 'blue': 0.007843137254902, 'alpha': 1}, {'red': 0.98823529411765, 'green': 0.066666666666667, 'blue': 0.03921568627451, 'alpha': 1}, {'red': 1, 'green': 0.88627450980392, 'blue': 0.88235294117647, 'alpha': 1}, {'red': 1, 'green': 0.48627450980392, 'blue': 0.47450980392157, 'alpha': 1}, {'red': 0.58039215686275, 'green': 0.015686274509804, 'blue': 0, 'alpha': 1}, {'red': 0.14901960784314, 'green': 0.003921568627451, 'blue': 0, 'alpha': 1}, {'red': 0.094117647058824, 'green': 0.25882352941176, 'blue': 0.66666666666667, 'alpha': 1}, {'red': 0.8078431372549, 'green': 0.83529411764706, 'blue': 0.90196078431373, 'alpha': 1}, {'red': 0.4078431372549, 'green': 0.50980392156863, 'blue': 0.76862745098039, 'alpha': 1}, {'red': 0.027450980392157, 'green': 0.12941176470588, 'blue': 0.38823529411765, 'alpha': 1}, {'red': 0, 'green': 0.031372549019608, 'blue': 0.098039215686275, 'alpha': 1}, {'red': 1, 'green': 1, 'blue': 1, 'alpha': 1}, {'red': 0, 'green': 0, 'blue': 0, 'alpha': 1}]}

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
  [90, 78, 55, 30, 12].map(n => Color.fromHsla('0', '0%', n + '%', 1))
)

const cc = {  // colors
  yellow: colorTable[0],
  green: colorTable[1],
  red: colorTable[2],
  blue: colorTable[3],
  black: colorTable[4],
}

export const cs = {  // semantics
  ...cc,
  textBG: cc.yellow[0],
  textFG: cc.yellow[4],
  commandLineBG: cc.black[0],
  commandLineFG: cc.black[4],
  commandLineSelBG: cc.yellow[1],
  commandLineSelFG: cc.black[4],
}

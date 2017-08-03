// Palette history:
// http://paletton.com/#uid=70Y1X0kkOaei4rciqgin+5osx1N
// http://paletton.com/#uid=70Y1X0k7Lc16MwP8Wl3bJ5shH2L
// http://paletton.com/#uid=70Y1T0koNnEdKPmjGuJuhdcyn3V
// http://paletton.com/#uid=70Y1T0ktswI4yW5jsDQ-UmhSo8A
// http://paletton.com/#uid=70Y1T0kuGvG3KRDgSEkGWixVN4J
// http://paletton.com/#uid=60Z0P0kkfjZ3JTBb+tvsmbCNk2j
// http://paletton.com/#uid=61f180k8njb0nX54Fs3d2a3pv6g

/* eslint-disable max-len */

// Copy-paste from Paletton.com via 'Tables / Export...' > 'Color swatches' > 'as Sketch Palette'
const palettonExport = {'compatibleVersion': '1.4', 'pluginVersion': '1.5', 'colors': [{'red': 0.6, 'green': 0.56470588235294, 'blue': 0.44313725490196, 'alpha': 1}, {'red': 1, 'green': 0.99607843137255, 'blue': 0.98823529411765, 'alpha': 1}, {'red': 0.87843137254902, 'green': 0.84705882352941, 'blue': 0.74901960784314, 'alpha': 1}, {'red': 0.31372549019608, 'green': 0.28627450980392, 'blue': 0.1843137254902, 'alpha': 1}, {'red': 0.19607843137255, 'green': 0.16078431372549, 'blue': 0.03921568627451, 'alpha': 1}, {'red': 0.6, 'green': 0.46666666666667, 'blue': 0.44313725490196, 'alpha': 1}, {'red': 1, 'green': 0.9921568627451, 'blue': 0.98823529411765, 'alpha': 1}, {'red': 0.87843137254902, 'green': 0.76862745098039, 'blue': 0.74901960784314, 'alpha': 1}, {'red': 0.31372549019608, 'green': 0.2078431372549, 'blue': 0.1843137254902, 'alpha': 1}, {'red': 0.19607843137255, 'green': 0.062745098039216, 'blue': 0.03921568627451, 'alpha': 1}, {'red': 0.50588235294118, 'green': 0.55686274509804, 'blue': 0.41176470588235, 'alpha': 1}, {'red': 0.98823529411765, 'green': 0.9921568627451, 'blue': 0.98039215686275, 'alpha': 1}, {'red': 0.77647058823529, 'green': 0.8156862745098, 'blue': 0.69803921568627, 'alpha': 1}, {'red': 0.25098039215686, 'green': 0.29411764705882, 'blue': 0.17254901960784, 'alpha': 1}, {'red': 0.13333333333333, 'green': 0.18039215686275, 'blue': 0.035294117647059, 'alpha': 1}, {'red': 0.32941176470588, 'green': 0.32156862745098, 'blue': 0.4156862745098, 'alpha': 1}, {'red': 0.95294117647059, 'green': 0.95294117647059, 'blue': 0.96470588235294, 'alpha': 1}, {'red': 0.54117647058824, 'green': 0.53333333333333, 'blue': 0.61176470588235, 'alpha': 1}, {'red': 0.14901960784314, 'green': 0.14117647058824, 'blue': 0.21960784313725, 'alpha': 1}, {'red': 0.050980392156863, 'green': 0.043137254901961, 'blue': 0.13725490196078, 'alpha': 1}, {'red': 1, 'green': 1, 'blue': 1, 'alpha': 1}, {'red': 0, 'green': 0, 'blue': 0, 'alpha': 1}]}

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

const cc = {  // colors
  primary: colorTable[0],
  bad: colorTable[1],
  good: colorTable[2],
  complement: colorTable[3],
  black: colorTable[4],
}

export const cs = {  // semantics
  ...cc,
  normalBG: cc.black[0],
  normalFG: cc.primary[4],
  errorFG: cc.bad[2],

  boxShadow: 'hsla(0,0%,0%,0.15)',

  commandLineBG: cc.primary[0],
  commandLineFG: cc.primary[4],
  commandLineSelBG: cc.primary[2],
  commandLineSelFG: cc.primary[0],
}

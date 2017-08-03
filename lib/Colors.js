// Palette history:
// http://paletton.com/#uid=70Y1X0kkOaei4rciqgin+5osx1N
// http://paletton.com/#uid=70Y1X0k7Lc16MwP8Wl3bJ5shH2L
// http://paletton.com/#uid=70Y1T0koNnEdKPmjGuJuhdcyn3V
// http://paletton.com/#uid=70Y1T0ktswI4yW5jsDQ-UmhSo8A
// http://paletton.com/#uid=70Y1T0kuGvG3KRDgSEkGWixVN4J
// http://paletton.com/#uid=60Z0P0kkfjZ3JTBb+tvsmbCNk2j
// http://paletton.com/#uid=61f180k8njb0nX54Fs3d2a3pv6g
// http://paletton.com/#uid=61f180k9oi029Wg6Br0dm8Vmj4E

/* eslint-disable max-len */

// Copy-paste from Paletton.com via 'Tables / Export...' > 'Color swatches' > 'as Sketch Palette'
const palettonExport = {'compatibleVersion': '1.4', 'pluginVersion': '1.5', 'colors': [{'red': 0.56470588235294, 'green': 0.52549019607843, 'blue': 0.39607843137255, 'alpha': 1}, {'red': 1, 'green': 0.9843137254902, 'blue': 0.93333333333333, 'alpha': 1}, {'red': 0.84313725490196, 'green': 0.80392156862745, 'blue': 0.67058823529412, 'alpha': 1}, {'red': 0.27843137254902, 'green': 0.25098039215686, 'blue': 0.16078431372549, 'alpha': 1}, {'red': 0.14509803921569, 'green': 0.12156862745098, 'blue': 0.043137254901961, 'alpha': 1}, {'red': 0.47058823529412, 'green': 0.52549019607843, 'blue': 0.36862745098039, 'alpha': 1}, {'red': 0.96862745098039, 'green': 0.98823529411765, 'blue': 0.92156862745098, 'alpha': 1}, {'red': 0.72941176470588, 'green': 0.7843137254902, 'blue': 0.62352941176471, 'alpha': 1}, {'red': 0.22352941176471, 'green': 0.25882352941176, 'blue': 0.15294117647059, 'alpha': 1}, {'red': 0.10196078431373, 'green': 0.13333333333333, 'blue': 0.03921568627451, 'alpha': 1}, {'red': 0.56470588235294, 'green': 0.42352941176471, 'blue': 0.39607843137255, 'alpha': 1}, {'red': 1, 'green': 0.94509803921569, 'blue': 0.93333333333333, 'alpha': 1}, {'red': 0.84313725490196, 'green': 0.69803921568627, 'blue': 0.67058823529412, 'alpha': 1}, {'red': 0.27843137254902, 'green': 0.18039215686275, 'blue': 0.16078431372549, 'alpha': 1}, {'red': 0.14509803921569, 'green': 0.058823529411765, 'blue': 0.043137254901961, 'alpha': 1}, {'red': 0.30196078431373, 'green': 0.29411764705882, 'blue': 0.3921568627451, 'alpha': 1}, {'red': 0.90196078431373, 'green': 0.89803921568627, 'blue': 0.95686274509804, 'alpha': 1}, {'red': 0.49019607843137, 'green': 0.48235294117647, 'blue': 0.58823529411765, 'alpha': 1}, {'red': 0.12941176470588, 'green': 0.12549019607843, 'blue': 0.1921568627451, 'alpha': 1}, {'red': 0.043137254901961, 'green': 0.03921568627451, 'blue': 0.10196078431373, 'alpha': 1}, {'red': 1, 'green': 1, 'blue': 1, 'alpha': 1}, {'red': 0, 'green': 0, 'blue': 0, 'alpha': 1}]}

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

export const cc = {  // colors
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

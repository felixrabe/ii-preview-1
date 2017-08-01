// Palette history:
// http://paletton.com/#uid=70Y1X0kkOaei4rciqgin+5osx1N
// http://paletton.com/#uid=70Y1X0k7Lc16MwP8Wl3bJ5shH2L
// http://paletton.com/#uid=70Y1T0koNnEdKPmjGuJuhdcyn3V
// http://paletton.com/#uid=70Y1T0ktswI4yW5jsDQ-UmhSo8A

// Copy-paste from Paletton.com via 'Tables / Export...' > 'Color swatches' > 'as Sketch Palette'
const palettonExport = {"compatibleVersion":"1.4","pluginVersion":"1.5","colors":[ {"red":1,"green":0.69803921568627,"blue":0.07843137254902,"alpha":1}, {"red":1,"green":0.95294117647059,"blue":0.85882352941176,"alpha":1}, {"red":1,"green":0.8,"blue":0.3921568627451,"alpha":1}, {"red":0.69411764705882,"green":0.46666666666667,"blue":0,"alpha":1}, {"red":0.26666666666667,"green":0.18039215686275,"blue":0,"alpha":1}, {"red":0.062745098039216,"green":0.7921568627451,"blue":0.10980392156863,"alpha":1}, {"red":0.83137254901961,"green":0.96862745098039,"blue":0.83921568627451,"alpha":1}, {"red":0.33333333333333,"green":0.84705882352941,"blue":0.36470588235294,"alpha":1}, {"red":0,"green":0.54901960784314,"blue":0.035294117647059,"alpha":1}, {"red":0,"green":0.21176470588235,"blue":0.015686274509804,"alpha":1}, {"red":1,"green":0.10196078431373,"blue":0.07843137254902,"alpha":1}, {"red":1,"green":0.86274509803922,"blue":0.85882352941176,"alpha":1}, {"red":1,"green":0.4078431372549,"blue":0.3921568627451,"alpha":1}, {"red":0.69411764705882,"green":0.019607843137255,"blue":0,"alpha":1}, {"red":0.26666666666667,"green":0.007843137254902,"blue":0,"alpha":1}, {"red":0.12156862745098,"green":0.27843137254902,"blue":0.67843137254902,"alpha":1}, {"red":0.83137254901961,"green":0.86274509803922,"blue":0.94901960784314,"alpha":1}, {"red":0.34901960784314,"green":0.46666666666667,"blue":0.76078431372549,"alpha":1}, {"red":0.043137254901961,"green":0.16470588235294,"blue":0.46666666666667,"alpha":1}, {"red":0.003921568627451,"green":0.054901960784314,"blue":0.18039215686275,"alpha":1}, {"red":1,"green":1,"blue":1,"alpha":1}, {"red":0,"green":0,"blue":0,"alpha":1} ]}

class Color {
  constructor(r, g, b, a) {
    const asel = Math.min(0.99, a)  // https://stackoverflow.com/a/7224621

    this.normal = 'rgba(' + [r,g,b,a].join(',') + ')'
    this.sel = 'rgba(' + [r,g,b,asel].join(',') + ')'
  }

  toString = () => {
    return this.normal
  }
}

let colors = palettonExport.colors.slice()

export const colorTable = [...Array(4)].map(() =>
  [...Array(5)].map(() => {
    const v = colors.shift()
    const [r, g, b] = [v.red, v.green, v.blue].map(x => x*100+'%')
    return new Color(r, g, b, v.alpha)

    // columns from light to dark: 1 2 0 3 4  (inverse: 2 0 1 3 4)
  }).reduce((r, v, i) => (r[{0:2,1:0,2:1,3:3,4:4}[i]] = v, r), [])
)

const cc = {  // colors
  yellow: colorTable[0],
  green: colorTable[1],
  red: colorTable[2],
  blue: colorTable[3],
  black: [92, 71, 50, 29, 8].map(n => `hsla(0,0%,${n}%,1)`),
}

export const cs = {  // semantics
  ...cc,
  baseBG: cc.yellow[0],
  baseFG: cc.yellow[4],
  commandLineBG: cc.black[0],
  commandLineFG: cc.black[4],
  commandLineSelBG: cc.black[4].sel,
  commandLineSelFG: cc.black[0],
}

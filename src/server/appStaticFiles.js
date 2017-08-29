import serveStatic from '@node/serve-static'

const appStaticFiles = (dir) => serveStatic(dir, {index: false})

export const __useDefault = appStaticFiles
export default __useDefault

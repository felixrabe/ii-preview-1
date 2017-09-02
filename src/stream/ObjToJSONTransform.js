import stream from '@node/stream'

class ObjToJSONTransform extends stream.Transform {
  constructor() {
    super({writableObjectMode: true})
  }

  _transform(chunk, encoding, callback) {
    let result, err
    try {
      result = JSON.stringify(chunk)
    } catch (err_) {
      err = err_
      result = JSON.stringify({error: err.name, message: err.message})
    }
    this.push(result + '\n')
    callback(err)
  }
}

export const __useDefault = ObjToJSONTransform
export default __useDefault

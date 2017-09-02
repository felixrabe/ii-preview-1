import {Transform} from 'stream'

export default class ObjToJSONTransform extends Transform {
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

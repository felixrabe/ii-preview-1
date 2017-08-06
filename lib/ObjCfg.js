export default class ObjCfg {
  constructor(cfg) {
    this.cfg = cfg
  }

  get constant() {
    return this.cfg.constant
  }

  propsFor = (v) => {  // eslint-disable-line no-unused-vars
    return {}
  }
}

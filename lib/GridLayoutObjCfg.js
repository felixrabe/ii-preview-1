const GRID_DATA_KEYS = ['x', 'y', 'w', 'h', 'minW', 'minH']

export default class GridLayoutObjCfg {
  constructor(cfg) {
    this.cfg = cfg
  }

  get constant() {
    return this.cfg.constant
  }

  gridDataWithDefault = (gridData) => {
    gridData = {...gridData}

    GRID_DATA_KEYS.forEach(k => {
      if (typeof this.cfg[k] !== 'undefined') {
        gridData[k] = this.cfg[k]
      }
    })

    return gridData
  }
}

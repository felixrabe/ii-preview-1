import ObjCfg from './ObjCfg'

const DATA_GRID_KEYS = ['x', 'y', 'w', 'h', 'minW', 'minH']

const DEFAULT_DATA_GRID = {x: 0, y: Infinity, w: 4, h: 3, minW: 2, minH: 2}

export default class GridLayoutObjCfg extends ObjCfg {
  propsFor = () => {
    return {'data-grid': Object.assign({},
      DEFAULT_DATA_GRID,
      ...DATA_GRID_KEYS
        .filter(k => typeof this.cfg[k] !== 'undefined')
        .map(k => ({[k]: this.cfg[k]})),
    )}
  }
}

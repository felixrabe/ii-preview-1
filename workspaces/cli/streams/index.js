[
  'Debug',
  'Delay',
  'Exec',
  'InLines',
  'JSONToObj',
  'ObjToJSON',
  'Tee',
  'ToString',
  'Trim',
].forEach(t => {
  t = t + 'Transform'
  exports[t] = require('./' + t)
})

await Promise.all([
  load('./extendEventTarget'),
  load('./extendNode'),
  load('./extendString'),
  load('./globals'),
  load('./loadCSS'),
])

await Promise.all([
  load('./reloader'),
  load('./base.css'),
])

;(await load('./extendPromise'))(Promise)

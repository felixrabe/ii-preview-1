export const later = (() => {
  let i = 0
  return (cb) => setTimeout(() => {
    console.log(cb)
    cb()
  }, ++i * 400)
})()

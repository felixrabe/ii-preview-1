export const later = (() => {
  let i = 0
  return (cb) => setTimeout(cb, ++i * 600)
})()

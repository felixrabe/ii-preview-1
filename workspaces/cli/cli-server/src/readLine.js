module.exports = (readable) => new Promise(resolve => {
  let line = ''

  const read = () => {
    let chunk
    while ((chunk = readable.read()) !== null) {
      const i = chunk.indexOf('\n')
      if (i > -1) {
        line += chunk.slice(0, i)
        readable.removeListener('readable', read)
        readable.unshift(chunk.slice(i + 1))
        resolve(line)
        return
      }
      line += chunk
    }
  }

  readable.on('readable', read)
})

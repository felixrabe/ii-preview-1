module.exports = (stream) => {
  stream.end = (...aa) => aa.length === 0 ? undefined : stream.write(...aa)
  return stream
}

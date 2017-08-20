export default (re, s, n = 1) => {
  const matches = []
  let match = re.exec(s)
  while (match !== null) {
    matches.push(match[n])
    match = re.exec(s)
  }

  return matches
}

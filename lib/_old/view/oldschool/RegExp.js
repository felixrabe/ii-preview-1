export const RE_IDENT = /[$_a-zA-Z][$_a-zA-Z0-9]*/

export const reFindAll = (re, s, n = 1) => {
  let match = re.exec(s)
  const matches = []
  while (match !== null) {
    matches.push(match[n])
    match = re.exec(s)
  }

  return matches
}

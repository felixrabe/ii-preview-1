export const fetch = async (stuff) => {
  const baseURL = SystemJS.getConfig('baseURL')
  if (!stuff.address.startsWith(baseURL)) {
    throw new Error('weird address')
  }

  let path = stuff.address.slice(baseURL.length + '$$dataAccess$$/'.length)
  path = path.replace(/%3A/g, ':')
  const dataAccess = stuff.metadata.instadevDataAccess
  return (await dataAccess.get(path)) || ''
}
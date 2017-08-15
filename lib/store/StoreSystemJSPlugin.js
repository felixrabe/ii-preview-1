export const fetch = async (stuff) => {
  const baseURL = SystemJS.getConfig('baseURL')
  if (!stuff.address.startsWith(baseURL)) {
    throw new Error('weird address')
  }

  let path = stuff.address.slice(baseURL.length + 'ii-store/'.length)
  path = path.replace(/%3A/g, ':')
  const store = stuff.metadata.instadevStore
  return (await store.get(path)) || ''
}

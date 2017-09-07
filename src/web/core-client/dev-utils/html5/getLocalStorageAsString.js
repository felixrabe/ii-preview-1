// https://stackoverflow.com/a/25063720

const getLocalStorageAsString = () => {
  const values = {}
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    let value = localStorage.getItem(key)
    values[key] = value
  }
  return JSON.stringify(values)
}

export const __useDefault = getLocalStorageAsString
export default __useDefault

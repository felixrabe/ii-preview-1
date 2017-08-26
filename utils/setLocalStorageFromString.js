const setLocalStorageFromString = (string) => {
  const values = JSON.parse(string)
  Object.keys(values).forEach(key => {
    localStorage.setItem(key, values[key])
  })
}

export const __useDefault = setLocalStorageFromString
export default __useDefault

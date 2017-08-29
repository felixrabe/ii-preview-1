// https://stackoverflow.com/a/18197341

const saveTextAs = (filename, text) => {
  const element = document.createElement('a')
  const uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  element.setAttribute('href', uri)
  element.setAttribute('download', filename)
  element.style.display = 'none'

  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const __useDefault = saveTextAs
export default __useDefault

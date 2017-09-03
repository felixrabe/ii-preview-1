const msg = 'Please select a text file containing a localStorage JSON backup:'

const createElements = () => {
  const div = document.createElement('div')
  div.textContent = msg
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'text/*')
  div.appendChild(input)
  return {div, input}
}

const openTextFile = async () => {
  const {div, input} = createElements()
  document.body.appendChild(div)

  let resolve
  const promise = new Promise(r => resolve = r)

  input.addEventListener('change', function () {
    const file = this.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        document.body.removeChild(div)
        resolve(reader.result)
      }
      reader.readAsText(file)
    }
  })

  return await promise
}

export const __useDefault = openTextFile
export default __useDefault

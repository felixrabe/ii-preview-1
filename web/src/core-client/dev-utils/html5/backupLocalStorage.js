import getLocalStorageAsString from './getLocalStorageAsString'
import saveTextAs from './saveTextAs'

const backupLocalStorage = () => {
  const text = getLocalStorageAsString()
  saveTextAs('localStorage.txt', text)
}

export const __useDefault = backupLocalStorage
export default __useDefault

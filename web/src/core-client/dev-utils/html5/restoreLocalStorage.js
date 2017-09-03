import openTextFile from './openTextFile'
import setLocalStorageFromString from './setLocalStorageFromString'

const restoreLocalStorage = async () => {
  const text = await openTextFile()
  setLocalStorageFromString(text)
}

export const __useDefault = restoreLocalStorage
export default __useDefault

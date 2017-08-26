import {extend as PromiseUtils} from './PromiseUtils'
import {extend as SystemJSUtils} from './SystemJSUtils'
import backupLocalStorage from './backupLocalStorage'
import getLocalStorageAsString from './getLocalStorageAsString'
import moduleName from './moduleName'
import openTextFile from './openTextFile'
import restoreLocalStorage from './restoreLocalStorage'
import saveTextAs from './saveTextAs'
import setLocalStorageFromString from './setLocalStorageFromString'

export {
  PromiseUtils,
  SystemJSUtils,
  backupLocalStorage,
  getLocalStorageAsString,
  moduleName,
  openTextFile,
  restoreLocalStorage,
  saveTextAs,
  setLocalStorageFromString,
}

export const extend = ({Promise, SystemJS, IISystemJS} = {}) => {
  if (Promise) PromiseUtils(Promise)
  if (SystemJS) SystemJSUtils(SystemJS)
  if (IISystemJS) SystemJSUtils(IISystemJS)
}

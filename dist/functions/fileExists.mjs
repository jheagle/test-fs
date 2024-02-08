import { accessSync, constants } from 'fs'
/**
 * Detect if a file exists and is usable.
 * @memberOf module:test-fs
 * @param {string} filePath
 * @returns {boolean}
 */
export const fileExists = (filePath) => {
  try {
    accessSync(filePath, constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}
export default fileExists

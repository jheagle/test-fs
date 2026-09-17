import { accessSync, constants } from 'fs'

/**
 * Detect if a file exists and is usable.
 * @function
 * @memberOf module:test-fs
 * @param {string} filePath - The path of the file to check.
 * @returns {boolean} True if the file exists and is accessible.
 */
export const fileExists = (filePath: string): boolean => {
  try {
    accessSync(filePath, constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

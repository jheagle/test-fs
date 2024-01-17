import { access, constants, rm } from 'fs'
/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath
 * @returns {Promise<*>}
 */
export const removeDirectory = (dirPath) => new Promise((resolve, reject) => access(dirPath, constants.F_OK, (removed) => removed
  ? resolve(dirPath)
  : rm(dirPath, { recursive: true }, (error) => error ? reject(error) : resolve(dirPath))))
export default removeDirectory

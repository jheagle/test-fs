import { access, constants, rm } from 'fs'
/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath - The path of the directory to remove, if it exists.
 * @returns {Promise<*>} Resolves with dirPath once removed (or immediately, if it didn't exist); rejects with the
 * removal error otherwise.
 */
export const removeDirectory = (dirPath) => new Promise((resolve, reject) => access(dirPath, constants.F_OK, (removed) => removed
  ? resolve(dirPath)
  : rm(dirPath, { recursive: true }, (error) => error ? reject(error) : resolve(dirPath))))

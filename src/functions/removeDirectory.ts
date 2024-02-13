import { access, constants, rm } from 'fs'

/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath
 * @returns {Promise<*>}
 */
export const removeDirectory = (dirPath: string): Promise<any> => new Promise(
  (resolve, reject) => access(
    dirPath,
    constants.F_OK,
    (removed: any): void => removed
      ? resolve(dirPath)
      : rm(
        dirPath,
        { recursive: true },
        (error: any) => error ? reject(error) : resolve(dirPath)
      )
  )
)

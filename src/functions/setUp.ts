import { mkdirSync } from 'fs'
// Import the configurations and override some of them to direct to the temp directory.
import removeDirectory from './removeDirectory'
import fileExists from './fileExists'

let tempDir = 'test-temp/'
let srcPath = `${tempDir}src`

/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>}
 */
export const afterEach = (): Promise<any> => removeDirectory(tempDir)

/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true]
 * @returns {Promise<*|void>}
 */
export const createTempDir = async (exists: boolean = true): Promise<any | void> => {
  if (exists) {
    return removeDirectory(tempDir)
      .then(removedDir => createTempDir(fileExists(removedDir)))
      .catch(error => console.error('Error: ', error))
  }
  return mkdirSync(srcPath, { recursive: true })
}

/**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>}
 */
export const beforeEach = (): Promise<any | void> => createTempDir()

export const setDefaults = (dirPath: string = null): void => {
  if (dirPath) {
    tempDir = dirPath
    srcPath = `${tempDir}src`
  }
}

export const setUp = {
  afterEach,
  beforeEach,
  createTempDir,
  setDefaults,
}

export default setUp

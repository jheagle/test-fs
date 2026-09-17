import { mkdirSync } from 'fs'
// Import the configurations and override some of them to direct to the temp directory.
import { removeDirectory } from './removeDirectory'
import { fileExists } from './fileExists'

let tempDir = 'test-temp/'
let srcPath = `${tempDir}src`

/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>} Resolves once the temp directory (tempDir, see {@link setDefaults}) has been removed.
 */
export const afterEach = (): Promise<any> => removeDirectory(tempDir)

/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true] - Whether the temp directory currently exists. Callers normally omit this; it's
 * used internally to recurse until removeDirectory reports the directory is gone, then create it fresh.
 * @returns {Promise<*|void>} Resolves once the temp directory has been removed and recreated.
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
 * @returns {Promise<*|void>} Resolves once the temp directory (tempDir, see {@link setDefaults}) has been created.
 */
export const beforeEach = (): Promise<any | void> => createTempDir()

/**
 * Override the temp directory path used by {@link afterEach}, {@link beforeEach}, and {@link createTempDir}. Call
 * this once, before your tests run, if the default ('test-temp/') doesn't suit your project.
 * @function
 * @memberOf module:test-fs
 * @param {string} [dirPath=null] - The directory path to use for temp files instead of the default. Ignored (the
 * existing default stays in effect) if falsy.
 * @returns {void}
 */
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

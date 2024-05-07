import { mkdirSync } from 'fs'
// Import the configurations and override some of them to direct to the temp directory.
import { removeDirectory } from './removeDirectory.mjs'
import { fileExists } from './fileExists.mjs'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
let tempDir = 'test-temp/'
let srcPath = `${tempDir}src`
/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>}
 */
export const afterEach = () => removeDirectory(tempDir)
/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true]
 * @returns {Promise<*|void>}
 */
export const createTempDir = (...args_1) => __awaiter(void 0, [...args_1], void 0, function * (exists = true) {
  if (exists) {
    return removeDirectory(tempDir)
      .then(removedDir => createTempDir(fileExists(removedDir)))
      .catch(error => console.error('Error: ', error))
  }
  return mkdirSync(srcPath, { recursive: true })
})
/**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>}
 */
export const beforeEach = () => createTempDir()
export const setDefaults = (dirPath = null) => {
  if (dirPath) {
    tempDir = dirPath
    srcPath = `${tempDir}src`
  }
}
export const setUp = {
  afterEach,
  beforeEach,
  createTempDir,
  setDefaults
}
export default setUp

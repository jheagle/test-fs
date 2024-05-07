'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.setUp = exports.setDefaults = exports.default = exports.createTempDir = exports.beforeEach = exports.afterEach = void 0
var _fs = require('fs')
var _removeDirectory = require('./removeDirectory')
var _fileExists = require('./fileExists')
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt (value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value)
    })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected (value) {
      try {
        step(generator.throw(value))
      } catch (e) {
        reject(e)
      }
    }
    function step (result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}

// Import the configurations and override some of them to direct to the temp directory.

let tempDir = 'test-temp/'
let srcPath = `${tempDir}src`
/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>}
 */
const afterEach = () => (0, _removeDirectory.removeDirectory)(tempDir)
/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true]
 * @returns {Promise<*|void>}
 */
exports.afterEach = afterEach
const createTempDir = (...args_1) => __awaiter(void 0, [...args_1], void 0, function * (exists = true) {
  if (exists) {
    return (0, _removeDirectory.removeDirectory)(tempDir).then(removedDir => createTempDir((0, _fileExists.fileExists)(removedDir))).catch(error => console.error('Error: ', error))
  }
  return (0, _fs.mkdirSync)(srcPath, {
    recursive: true
  })
})
/**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>}
 */
exports.createTempDir = createTempDir
const beforeEach = () => createTempDir()
exports.beforeEach = beforeEach
const setDefaults = (dirPath = null) => {
  if (dirPath) {
    tempDir = dirPath
    srcPath = `${tempDir}src`
  }
}
exports.setDefaults = setDefaults
const setUp = exports.setUp = {
  afterEach,
  beforeEach,
  createTempDir,
  setDefaults
}
var _default = exports.default = setUp

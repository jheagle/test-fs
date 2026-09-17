'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.removeDirectory = void 0
var _fs = require('fs')
/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath - The path of the directory to remove, if it exists.
 * @returns {Promise<*>} Resolves with dirPath once removed (or immediately, if it didn't exist); rejects with the
 * removal error otherwise.
 */
const removeDirectory = dirPath => new Promise((resolve, reject) => (0, _fs.access)(dirPath, _fs.constants.F_OK, removed => removed ? resolve(dirPath) : (0, _fs.rm)(dirPath, {
  recursive: true
}, error => error ? reject(error) : resolve(dirPath))))
exports.removeDirectory = removeDirectory

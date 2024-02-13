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
 * @param {string} dirPath
 * @returns {Promise<*>}
 */
const removeDirectory = dirPath => new Promise((resolve, reject) => (0, _fs.access)(dirPath, _fs.constants.F_OK, removed => removed ? resolve(dirPath) : (0, _fs.rm)(dirPath, {
  recursive: true
}, error => error ? reject(error) : resolve(dirPath))))
exports.removeDirectory = removeDirectory

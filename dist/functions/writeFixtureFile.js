'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.writeFixtureFile = void 0
var _path = require('path')
var _fs = require('fs')
/**
 * Write a file, creating any missing parent directories first.
 * @function
 * @memberOf module:test-fs
 * @param {string} filePath - The path of the file to write.
 * @param {string} content - The content to write into the file.
 * @returns {undefined}
 */
const writeFixtureFile = (filePath, content) => {
  (0, _fs.mkdirSync)((0, _path.dirname)(filePath), {
    recursive: true
  });
  (0, _fs.writeFileSync)(filePath, content)
}
exports.writeFixtureFile = writeFixtureFile

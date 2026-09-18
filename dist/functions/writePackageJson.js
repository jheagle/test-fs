'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.writePackageJson = void 0
var _writeFixtureFile = require('./writeFixtureFile')
/**
 * Write a package.json file for a directory, creating any missing parent directories first. Parses and
 * re-serializes with a plain 2-space indent regardless of how `fields` was built, so callers never need to worry
 * about matching JSON formatting by hand.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath - The directory to write the package.json file into.
 * @param {Object<string, *>} fields - The package.json fields to write.
 * @returns {undefined}
 */
const writePackageJson = (dirPath, fields) => (0, _writeFixtureFile.writeFixtureFile)(`${dirPath}/package.json`, JSON.stringify(fields, null, 2) + '\n')
exports.writePackageJson = writePackageJson

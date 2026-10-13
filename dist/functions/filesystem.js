'use strict'

require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _exportNames = {
  filesystem: true
}
exports.filesystem = void 0
var _copyRealModules = require('./filesystem/copyRealModules')
Object.keys(_copyRealModules).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _copyRealModules[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _copyRealModules[key]
    }
  })
})
var _fileExists = require('./filesystem/fileExists')
Object.keys(_fileExists).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _fileExists[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fileExists[key]
    }
  })
})
var _removeDirectory = require('./filesystem/removeDirectory')
Object.keys(_removeDirectory).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _removeDirectory[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _removeDirectory[key]
    }
  })
})
var _setUp = require('./filesystem/setUp')
Object.keys(_setUp).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _setUp[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setUp[key]
    }
  })
})
var _writeFixtureFile = require('./filesystem/writeFixtureFile')
Object.keys(_writeFixtureFile).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _writeFixtureFile[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _writeFixtureFile[key]
    }
  })
})
var _writePackageJson = require('./filesystem/writePackageJson')
Object.keys(_writePackageJson).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _writePackageJson[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _writePackageJson[key]
    }
  })
})
/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 */

const filesystem = exports.filesystem = {
  copyRealModules: _copyRealModules.copyRealModules,
  fileExists: _fileExists.fileExists,
  removeDirectory: _removeDirectory.removeDirectory,
  setUp: _setUp.setUp,
  writeFixtureFile: _writeFixtureFile.writeFixtureFile,
  writePackageJson: _writePackageJson.writePackageJson
}

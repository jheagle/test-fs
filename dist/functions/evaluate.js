'use strict'

require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _exportNames = {
  evaluate: true,
  evaluateBrowser: true
}
exports.evaluateBrowser = exports.evaluate = void 0
var _countMatches = require('./evaluate/countMatches')
Object.keys(_countMatches).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _countMatches[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _countMatches[key]
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
/**
 * Functions that can be used in assertions/evals in tests.
 */

const evaluate = exports.evaluate = {
  countMatches: _countMatches.countMatches,
  fileExists: _fileExists.fileExists
}
const evaluateBrowser = exports.evaluateBrowser = {
  countMatches: _countMatches.countMatches
}

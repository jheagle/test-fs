'use strict'

require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _exportNames = {
  testFs: true,
  testFsBrowser: true
}
exports.testFsBrowser = exports.testFs = void 0
var _debugging = require('./functions/debugging')
Object.keys(_debugging).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _debugging[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _debugging[key]
    }
  })
})
var _evaluate = require('./functions/evaluate')
Object.keys(_evaluate).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _evaluate[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _evaluate[key]
    }
  })
})
var _filesystem = require('./functions/filesystem')
Object.keys(_filesystem).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _filesystem[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filesystem[key]
    }
  })
})
var _objects = require('./functions/objects')
Object.keys(_objects).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _objects[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _objects[key]
    }
  })
})
/**
 * All of the features available in test-filesystem
 */

const testFs = exports.testFs = {
  debugging: _debugging.debugging,
  evaluate: _evaluate.evaluate,
  filesystem: _filesystem.filesystem,
  objects: _objects.objects
}
const testFsBrowser = exports.testFsBrowser = {
  debugging: _debugging.debugging,
  evaluate: _evaluate.evaluate,
  objects: _objects.objects
}

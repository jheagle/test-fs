'use strict'

require('core-js/modules/esnext.async-iterator.for-each.js')
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
var _circularObject = require('./functions/circularObject')
Object.keys(_circularObject).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _circularObject[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _circularObject[key]
    }
  })
})
var _countMatches = require('./functions/countMatches')
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
var _deepReferenceObject = require('./functions/deepReferenceObject')
Object.keys(_deepReferenceObject).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _deepReferenceObject[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deepReferenceObject[key]
    }
  })
})
var _domItem = require('./functions/domItem')
Object.keys(_domItem).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _domItem[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _domItem[key]
    }
  })
})
var _fileExists = require('./functions/fileExists')
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
var _jsonDom = require('./functions/jsonDom')
Object.keys(_jsonDom).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _jsonDom[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jsonDom[key]
    }
  })
})
var _linkedList = require('./functions/linkedList')
Object.keys(_linkedList).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _linkedList[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _linkedList[key]
    }
  })
})
var _logObject = require('./functions/logObject')
Object.keys(_logObject).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _logObject[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logObject[key]
    }
  })
})
var _multiReferenceObject = require('./functions/multiReferenceObject')
Object.keys(_multiReferenceObject).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _multiReferenceObject[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiReferenceObject[key]
    }
  })
})
var _nodeTree = require('./functions/nodeTree')
Object.keys(_nodeTree).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _nodeTree[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeTree[key]
    }
  })
})
var _removeDirectory = require('./functions/removeDirectory')
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
var _setUp = require('./functions/setUp')
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
/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */

const testFs = exports.testFs = {
  circularObject: _circularObject.circularObject,
  countMatches: _countMatches.countMatches,
  deepReferenceObject: _deepReferenceObject.deepReferenceObject,
  domItem: _domItem.domItem,
  fileExists: _fileExists.fileExists,
  jsonDom: _jsonDom.jsonDom,
  linkedList: _linkedList.linkedList,
  logObject: _logObject.logObject,
  multiReferenceObject: _multiReferenceObject.multiReferenceObject,
  nodeTree: _nodeTree.nodeTree,
  removeDirectory: _removeDirectory.removeDirectory,
  setUp: _setUp.setUp
}
const testFsBrowser = exports.testFsBrowser = {
  circularObject: _circularObject.circularObject,
  countMatches: _countMatches.countMatches,
  deepReferenceObject: _deepReferenceObject.deepReferenceObject,
  domItem: _domItem.domItem,
  jsonDom: _jsonDom.jsonDom,
  linkedList: _linkedList.linkedList,
  logObject: _logObject.logObject,
  multiReferenceObject: _multiReferenceObject.multiReferenceObject,
  nodeTree: _nodeTree.nodeTree
}
if (void 0) {
  // @ts-ignore
  (void 0).testFs = testFsBrowser
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.testFs = testFsBrowser
}

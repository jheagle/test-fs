'use strict'

require('core-js/modules/esnext.weak-map.delete-all.js')
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
exports.testFsBrowser = exports.testFs = exports.default = void 0
var _circularObject = _interopRequireWildcard(require('./functions/circularObject'))
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
var _countMatches = _interopRequireWildcard(require('./functions/countMatches'))
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
var _deepReferenceObject = _interopRequireWildcard(require('./functions/deepReferenceObject'))
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
var _domItem = _interopRequireWildcard(require('./functions/domItem'))
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
var _jsonDom = _interopRequireWildcard(require('./functions/jsonDom'))
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
var _linkedList = _interopRequireWildcard(require('./functions/linkedList'))
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
var _logObject = _interopRequireWildcard(require('./functions/logObject'))
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
var _multiReferenceObject = _interopRequireWildcard(require('./functions/multiReferenceObject'))
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
var _nodeTree = _interopRequireWildcard(require('./functions/nodeTree'))
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
var _removeDirectory = _interopRequireWildcard(require('./functions/removeDirectory'))
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
var _setUp = _interopRequireWildcard(require('./functions/setUp'))
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
function _getRequireWildcardCache (e) { if (typeof WeakMap !== 'function') return null; var r = new WeakMap(); var t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r })(e) }
function _interopRequireWildcard (e, r) { if (!r && e && e.__esModule) return e; if (e === null || typeof e !== 'object' && typeof e !== 'function') return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }; var a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if (u !== 'default' && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u] } return n.default = e, t && t.set(e, n), n }
/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */

const testFs = exports.testFs = {
  circularObject: _circularObject.default,
  countMatches: _countMatches.default,
  deepReferenceObject: _deepReferenceObject.default,
  domItem: _domItem.default,
  jsonDom: _jsonDom.default,
  linkedList: _linkedList.default,
  logObject: _logObject.default,
  multiReferenceObject: _multiReferenceObject.default,
  nodeTree: _nodeTree.default,
  removeDirectory: _removeDirectory.default,
  setUp: _setUp.default
}
var _default = exports.default = testFs
const testFsBrowser = exports.testFsBrowser = {
  circularObject: _circularObject.default,
  countMatches: _countMatches.default,
  deepReferenceObject: _deepReferenceObject.default,
  domItem: _domItem.default,
  jsonDom: _jsonDom.default,
  linkedList: _linkedList.default,
  logObject: _logObject.default,
  multiReferenceObject: _multiReferenceObject.default,
  nodeTree: _nodeTree.default
}
if (void 0) {
  // @ts-ignore
  (void 0).testFs = testFsBrowser
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.testFs = testFsBrowser
}

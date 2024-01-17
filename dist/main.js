'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.testFsBrowser = exports.testFs = exports.default = void 0
var _circularObject = _interopRequireDefault(require('./functions/circularObject'))
var _countMatches = _interopRequireDefault(require('./functions/countMatches'))
var _deepReferenceObject = _interopRequireDefault(require('./functions/deepReferenceObject'))
var _domItem = _interopRequireDefault(require('./functions/domItem'))
var _jsonDom = _interopRequireDefault(require('./functions/jsonDom'))
var _linkedList = _interopRequireDefault(require('./functions/linkedList'))
var _logObject = _interopRequireDefault(require('./functions/logObject'))
var _multiReferenceObject = _interopRequireDefault(require('./functions/multiReferenceObject'))
var _nodeTree = _interopRequireDefault(require('./functions/nodeTree'))
var _removeDirectory = _interopRequireDefault(require('./functions/removeDirectory'))
var _setUp = _interopRequireDefault(require('./functions/setUp'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
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

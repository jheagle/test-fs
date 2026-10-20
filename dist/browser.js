'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.objects = exports.evaluate = exports.debugging = void 0
var _logObject = require('./functions/debugging/logObject')
var _countMatches = require('./functions/evaluate/countMatches')
var _circularObject = require('./functions/objects/circularObject')
var _deepReferenceObject = require('./functions/objects/deepReferenceObject')
var _domItem = require('./functions/objects/domItem')
var _jsonDom = require('./functions/objects/jsonDom')
var _linkedList = require('./functions/objects/linkedList')
var _multiReferenceObject = require('./functions/objects/multiReferenceObject')
var _nodeTree = require('./functions/objects/nodeTree')
/**
 * The browser bundle entry: only the browser-safe functions, grouped by category.
 * Imports the individual functions rather than the category modules, so the Node-only filesystem functions stay
 * out of the bundle.
 */

const debugging = exports.debugging = {
  logObject: _logObject.logObject
}
const evaluate = exports.evaluate = {
  countMatches: _countMatches.countMatches
}
const objects = exports.objects = {
  circularObject: _circularObject.circularObject,
  deepReferenceObject: _deepReferenceObject.deepReferenceObject,
  domItem: _domItem.domItem,
  jsonDom: _jsonDom.jsonDom,
  linkedList: _linkedList.linkedList,
  multiReferenceObject: _multiReferenceObject.multiReferenceObject,
  nodeTree: _nodeTree.nodeTree
}

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.circularObject = void 0
/**
 * Multilayered node tree-like structure with parent references
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
const circularObject = exports.circularObject = {
  name: 'root',
  parent: null,
  body: null,
  head: null,
  children: []
}
circularObject.children = [{
  name: 'body',
  parent: null,
  children: []
}, {
  name: 'head',
  parent: null,
  children: []
}]
circularObject.body = circularObject.children[0]
circularObject.head = circularObject.children[1]
circularObject.body.parent = circularObject
circularObject.head.parent = circularObject
circularObject.body.children = [{
  name: 'body child one',
  parent: null,
  children: []
}, {
  name: 'body child two',
  parent: null,
  children: []
}]
circularObject.body.children[0].parent = circularObject.body
circularObject.body.children[1].parent = circularObject.body
circularObject.head.children = [{
  name: 'head child one',
  parent: null,
  children: []
}, {
  name: 'head child two',
  parent: null,
  children: []
}]
circularObject.head.children[0].parent = circularObject.head
circularObject.head.children[1].parent = circularObject.head

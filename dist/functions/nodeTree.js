'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.nodeTree = void 0
/**
 * Sample NodeTree for testing circular references and arrays.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
const nodeTree = exports.nodeTree = {
  name: 'one',
  parent: null,
  children: []
}
nodeTree.children[0] = {
  name: 'child one',
  parent: nodeTree,
  children: []
}
nodeTree.children[1] = {
  name: 'child two',
  parent: nodeTree,
  children: []
}
nodeTree.children[0].children[0] = {
  name: 'grandchild one',
  parent: nodeTree.children[0],
  children: []
}

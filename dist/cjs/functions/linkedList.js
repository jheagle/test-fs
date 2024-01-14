'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.linkedList = exports.default = void 0
/**
 * Sample LinkedList for testing circular references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object>}
 */
const linkedList = exports.linkedList = {
  name: 'one',
  prev: null,
  next: null
}
linkedList.next = {
  name: 'two',
  prev: linkedList,
  next: null
}
linkedList.next.next = {
  name: 'three',
  prev: linkedList.next,
  next: null
}
var _default = exports.default = linkedList

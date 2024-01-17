'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.multiReferenceObject = exports.default = void 0
/**
 * Sample of an object containing multiple references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Object>}
 */
const multiReferenceObject = exports.multiReferenceObject = {
  object1: {
    name: 'someName'
  },
  object2: {
    age: 12
  },
  array1: ['someString', 'anotherString'],
  array2: [89, 32],
  title: 'Some Title',
  item: 45
}
var _default = exports.default = multiReferenceObject

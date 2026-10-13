'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.deepReferenceObject = void 0
/**
 * Sample object with deep references.
 */
const deepReferenceObject = exports.deepReferenceObject = {
  object1: {
    name: 'someName',
    object2: {
      age: 12,
      array1: ['someString', 'anotherString']
    },
    array2: [89, 32]
  },
  title: 'Some Title',
  item: 45
}

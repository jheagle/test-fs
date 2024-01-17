/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */
import circularObject from './functions/circularObject.mjs'
import countMatches from './functions/countMatches.mjs'
import deepReferenceObject from './functions/deepReferenceObject.mjs'
import domItem from './functions/domItem.mjs'
import jsonDom from './functions/jsonDom.mjs'
import linkedList from './functions/linkedList.mjs'
import logObject from './functions/logObject.mjs'
import multiReferenceObject from './functions/multiReferenceObject.mjs'
import nodeTree from './functions/nodeTree.mjs'
import removeDirectory from './functions/removeDirectory.mjs'
import setUp from './functions/setUp.mjs'
export * from './functions/circularObject.mjs'
export * from './functions/countMatches.mjs'
export * from './functions/deepReferenceObject.mjs'
export * from './functions/domItem.mjs'
export * from './functions/jsonDom.mjs'
export * from './functions/linkedList.mjs'
export * from './functions/logObject.mjs'
export * from './functions/multiReferenceObject.mjs'
export * from './functions/nodeTree.mjs'
export * from './functions/removeDirectory.mjs'
export * from './functions/setUp.mjs'
export const testFs = {
  circularObject,
  countMatches,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  logObject,
  multiReferenceObject,
  nodeTree,
  removeDirectory,
  setUp
}
export default testFs
export const testFsBrowser = {
  circularObject,
  countMatches,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  logObject,
  multiReferenceObject,
  nodeTree
}
if (this) {
  // @ts-ignore
  this.testFs = testFsBrowser
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.testFs = testFsBrowser
}

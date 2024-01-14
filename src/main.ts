/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */

import circularObject from './functions/circularObject'
import countMatches from './functions/countMatches'
import deepReferenceObject from './functions/deepReferenceObject'
import domItem from './functions/domItem'
import jsonDom from './functions/jsonDom'
import linkedList from './functions/linkedList'
import logObject from './functions/logObject'
import multiReferenceObject from './functions/multiReferenceObject'
import nodeTree from './functions/nodeTree'
import removeDirectory from './functions/removeDirectory'
import setUp from './functions/setUp'

export let testFs = {
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
  setUp,
}

export default testFs

export let testFsBrowser = {
  circularObject,
  countMatches,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  logObject,
  multiReferenceObject,
  nodeTree,
}

if (this) {
  // @ts-ignore
  this.testFs = testFsBrowser
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.testFs = testFsBrowser
}

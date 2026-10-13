/**
 * Some sample objects to use in tests.
 */

import { circularObject } from './objects/circularObject'
import { deepReferenceObject } from './objects/deepReferenceObject'
import { domItem } from './objects/domItem'
import { jsonDom } from './objects/jsonDom'
import { linkedList } from './objects/linkedList'
import { multiReferenceObject } from './objects/multiReferenceObject'
import { nodeTree } from './objects/nodeTree'

export * from './objects/circularObject'
export * from './objects/deepReferenceObject'
export * from './objects/domItem'
export * from './objects/jsonDom'
export * from './objects/linkedList'
export * from './objects/multiReferenceObject'
export * from './objects/nodeTree'

export let objects = {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree,
}

export let objectsBrowser = {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree,
}

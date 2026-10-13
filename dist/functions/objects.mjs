/**
 * Some sample objects to use in tests.
 */
import { circularObject } from './objects/circularObject.mjs'
import { deepReferenceObject } from './objects/deepReferenceObject.mjs'
import { domItem } from './objects/domItem.mjs'
import { jsonDom } from './objects/jsonDom.mjs'
import { linkedList } from './objects/linkedList.mjs'
import { multiReferenceObject } from './objects/multiReferenceObject.mjs'
import { nodeTree } from './objects/nodeTree.mjs'
export * from './objects/circularObject.mjs'
export * from './objects/deepReferenceObject.mjs'
export * from './objects/domItem.mjs'
export * from './objects/jsonDom.mjs'
export * from './objects/linkedList.mjs'
export * from './objects/multiReferenceObject.mjs'
export * from './objects/nodeTree.mjs'
export const objects = {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree
}
export const objectsBrowser = {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree
}

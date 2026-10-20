/**
 * The browser bundle entry: only the browser-safe functions, grouped by category.
 * Imports the individual functions rather than the category modules, so the Node-only filesystem functions stay
 * out of the bundle.
 */

import { logObject } from './functions/debugging/logObject'
import { countMatches } from './functions/evaluate/countMatches'
import { circularObject } from './functions/objects/circularObject'
import { deepReferenceObject } from './functions/objects/deepReferenceObject'
import { domItem } from './functions/objects/domItem'
import { jsonDom } from './functions/objects/jsonDom'
import { linkedList } from './functions/objects/linkedList'
import { multiReferenceObject } from './functions/objects/multiReferenceObject'
import { nodeTree } from './functions/objects/nodeTree'

export let debugging = {
  logObject,
}

export let evaluate = {
  countMatches,
}

export let objects = {
  circularObject,
  deepReferenceObject,
  domItem,
  jsonDom,
  linkedList,
  multiReferenceObject,
  nodeTree,
}

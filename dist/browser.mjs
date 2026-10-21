/**
 * The browser bundle entry: only the browser-safe functions, grouped by category.
 * Imports the individual functions rather than the category modules, so the Node-only filesystem functions stay
 * out of the bundle.
 */
import { logObject } from './functions/debugging/logObject.mjs';
import { countMatches } from './functions/evaluate/countMatches.mjs';
import { circularObject } from './functions/objects/circularObject.mjs';
import { deepReferenceObject } from './functions/objects/deepReferenceObject.mjs';
import { domItem } from './functions/objects/domItem.mjs';
import { jsonDom } from './functions/objects/jsonDom.mjs';
import { linkedList } from './functions/objects/linkedList.mjs';
import { multiReferenceObject } from './functions/objects/multiReferenceObject.mjs';
import { nodeTree } from './functions/objects/nodeTree.mjs';
export const debugging = {
    logObject,
};
export const evaluate = {
    countMatches,
};
export const objects = {
    circularObject,
    deepReferenceObject,
    domItem,
    jsonDom,
    linkedList,
    multiReferenceObject,
    nodeTree,
};

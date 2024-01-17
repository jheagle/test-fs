import { jsonDomItem } from './domItem';
/**
 * Multilayered node tree-like structure with parent references
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
export declare const circularObject: {
    name: string;
    parent: null;
    body: jsonDomItem | null;
    head: jsonDomItem | null;
    children: jsonDomItem[] | [];
};
export default circularObject;

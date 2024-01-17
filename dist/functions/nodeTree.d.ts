export type treeLinker = {
    name: string;
    parent: treeLinker | null;
    children: Array<treeLinker> | [];
};
/**
 * Sample NodeTree for testing circular references and arrays.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
export declare const nodeTree: treeLinker;
export default nodeTree;

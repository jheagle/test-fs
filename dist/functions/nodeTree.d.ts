export type treeLinker = {
    name: string;
    parent: treeLinker | null;
    children: Array<treeLinker> | [];
};
/**
 * Sample NodeTree for testing circular references and arrays.
 */
export declare const nodeTree: treeLinker;

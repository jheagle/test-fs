export type treeLinker = { name: string, parent: treeLinker | null, children: Array<treeLinker> | [] }

/**
 * Sample NodeTree for testing circular references and arrays.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
export const nodeTree: treeLinker = { name: 'one', parent: null, children: [] }
nodeTree.children[0] = { name: 'child one', parent: nodeTree, children: [] }
nodeTree.children[1] = { name: 'child two', parent: nodeTree, children: [] }
nodeTree.children[0].children[0] = { name: 'grandchild one', parent: nodeTree.children[0], children: [] }

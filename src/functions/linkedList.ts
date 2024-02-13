export type linker = { name: string, prev: linker | null, next: linker | null }

/**
 * Sample LinkedList for testing circular references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object>}
 */
export const linkedList: linker = { name: 'one', prev: null, next: null }
linkedList.next = { name: 'two', prev: linkedList, next: null }
linkedList.next.next = { name: 'three', prev: linkedList.next, next: null }

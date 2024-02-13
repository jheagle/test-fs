export type linker = {
    name: string;
    prev: linker | null;
    next: linker | null;
};
/**
 * Sample LinkedList for testing circular references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object>}
 */
export declare const linkedList: linker;

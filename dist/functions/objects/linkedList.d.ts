export type linker = {
    name: string;
    prev: linker | null;
    next: linker | null;
};
/**
 * Sample LinkedList for testing circular references.
 */
export declare const linkedList: linker;

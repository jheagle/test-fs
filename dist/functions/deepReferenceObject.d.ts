/**
 * Sample object with deep references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Object>}
 */
export declare const deepReferenceObject: {
    object1: {
        name: string;
        object2: {
            age: number;
            array1: Array<string>;
        };
        array2: Array<number>;
    };
    title: string;
    item: number;
};

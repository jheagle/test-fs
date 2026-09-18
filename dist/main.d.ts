/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */
export * from './functions/circularObject';
export * from './functions/countMatches';
export * from './functions/deepReferenceObject';
export * from './functions/domItem';
export * from './functions/fileExists';
export * from './functions/jsonDom';
export * from './functions/linkedList';
export * from './functions/logObject';
export * from './functions/multiReferenceObject';
export * from './functions/nodeTree';
export * from './functions/removeDirectory';
export * from './functions/setUp';
export declare let testFs: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./functions/domItem").jsonDomItem | null;
        head: import("./functions/domItem").jsonDomItem | null;
        children: import("./functions/domItem").jsonDomItem[] | [];
    };
    countMatches: (content: string, search: string) => number;
    deepReferenceObject: {
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
    domItem: import("./functions/domItem").jsonDomItem[];
    fileExists: (filePath: string) => boolean;
    jsonDom: import("./functions/domItem").jsonDomItem;
    linkedList: import("./functions/linkedList").linker;
    logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
    multiReferenceObject: {
        object1: {
            name: string;
        };
        object2: {
            age: number;
        };
        array1: Array<string>;
        array2: Array<number>;
        title: string;
        item: number;
    };
    nodeTree: import("./functions/nodeTree").treeLinker;
    removeDirectory: (dirPath: string) => Promise<any>;
    setUp: {
        afterEach: () => Promise<any>;
        beforeEach: () => Promise<any | void>;
        createTempDir: (exists?: boolean) => Promise<any | void>;
        setDefaults: (dirPath?: string) => void;
    };
};
export declare let testFsBrowser: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./functions/domItem").jsonDomItem | null;
        head: import("./functions/domItem").jsonDomItem | null;
        children: import("./functions/domItem").jsonDomItem[] | [];
    };
    countMatches: (content: string, search: string) => number;
    deepReferenceObject: {
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
    domItem: import("./functions/domItem").jsonDomItem[];
    jsonDom: import("./functions/domItem").jsonDomItem;
    linkedList: import("./functions/linkedList").linker;
    logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
    multiReferenceObject: {
        object1: {
            name: string;
        };
        object2: {
            age: number;
        };
        array1: Array<string>;
        array2: Array<number>;
        title: string;
        item: number;
    };
    nodeTree: import("./functions/nodeTree").treeLinker;
};

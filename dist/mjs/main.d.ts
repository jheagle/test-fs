/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */
export declare let testFs: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./functions/domItem").jsonDomItem;
        head: import("./functions/domItem").jsonDomItem;
        children: [] | import("./functions/domItem").jsonDomItem[];
    };
    countMatches: (content: string, search: string) => number;
    deepReferenceObject: {
        object1: {
            name: string;
            object2: {
                age: number;
                array1: string[];
            };
            array2: number[];
        };
        title: string;
        item: number;
    };
    domItem: import("./functions/domItem").jsonDomItem[];
    jsonDom: import("./functions/domItem").jsonDomItem;
    linkedList: import("./functions/linkedList").linker;
    logObject: (object: any, label?: string, outputType?: "string" | "error" | "debug" | "log" | "warn") => string | void;
    multiReferenceObject: {
        object1: {
            name: string;
        };
        object2: {
            age: number;
        };
        array1: string[];
        array2: number[];
        title: string;
        item: number;
    };
    nodeTree: import("./functions/nodeTree").treeLinker;
    removeDirectory: (dirPath: string) => Promise<any>;
    setUp: {
        afterEach: () => Promise<any>;
        beforeEach: () => Promise<any>;
        createTempDir: (exists?: boolean) => Promise<any>;
        setDefaults: (dirPath?: string) => void;
    };
};
export default testFs;
export declare let testFsBrowser: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./functions/domItem").jsonDomItem;
        head: import("./functions/domItem").jsonDomItem;
        children: [] | import("./functions/domItem").jsonDomItem[];
    };
    countMatches: (content: string, search: string) => number;
    deepReferenceObject: {
        object1: {
            name: string;
            object2: {
                age: number;
                array1: string[];
            };
            array2: number[];
        };
        title: string;
        item: number;
    };
    domItem: import("./functions/domItem").jsonDomItem[];
    jsonDom: import("./functions/domItem").jsonDomItem;
    linkedList: import("./functions/linkedList").linker;
    logObject: (object: any, label?: string, outputType?: "string" | "error" | "debug" | "log" | "warn") => string | void;
    multiReferenceObject: {
        object1: {
            name: string;
        };
        object2: {
            age: number;
        };
        array1: string[];
        array2: number[];
        title: string;
        item: number;
    };
    nodeTree: import("./functions/nodeTree").treeLinker;
};

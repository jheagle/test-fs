/**
 * The browser bundle entry: only the browser-safe functions, grouped by category.
 * Imports the individual functions rather than the category modules, so the Node-only filesystem functions stay
 * out of the bundle.
 */
export declare let debugging: {
    logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
};
export declare let evaluate: {
    countMatches: (content: string, search: string) => number;
};
export declare let objects: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./functions/objects/domItem").jsonDomItem | null;
        head: import("./functions/objects/domItem").jsonDomItem | null;
        children: import("./functions/objects/domItem").jsonDomItem[] | [];
    };
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
    domItem: import("./functions/objects/domItem").jsonDomItem[];
    jsonDom: import("./functions/objects/domItem").jsonDomItem;
    linkedList: import("./functions/objects/linkedList").linker;
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
    nodeTree: import("./functions/objects/nodeTree").treeLinker;
};

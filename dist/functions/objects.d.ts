/**
 * Some sample objects to use in tests.
 */
export * from './objects/circularObject';
export * from './objects/deepReferenceObject';
export * from './objects/domItem';
export * from './objects/jsonDom';
export * from './objects/linkedList';
export * from './objects/multiReferenceObject';
export * from './objects/nodeTree';
export declare let objects: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./objects/domItem").jsonDomItem | null;
        head: import("./objects/domItem").jsonDomItem | null;
        children: import("./objects/domItem").jsonDomItem[] | [];
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
    domItem: import("./objects/domItem").jsonDomItem[];
    jsonDom: import("./objects/domItem").jsonDomItem;
    linkedList: import("./objects/linkedList").linker;
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
    nodeTree: import("./objects/nodeTree").treeLinker;
};
export declare let objectsBrowser: {
    circularObject: {
        name: string;
        parent: null;
        body: import("./objects/domItem").jsonDomItem | null;
        head: import("./objects/domItem").jsonDomItem | null;
        children: import("./objects/domItem").jsonDomItem[] | [];
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
    domItem: import("./objects/domItem").jsonDomItem[];
    jsonDom: import("./objects/domItem").jsonDomItem;
    linkedList: import("./objects/linkedList").linker;
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
    nodeTree: import("./objects/nodeTree").treeLinker;
};

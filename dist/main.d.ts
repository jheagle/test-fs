/**
 * All of the features available in test-filesystem
 */
export * from './functions/debugging';
export * from './functions/evaluate';
export * from './functions/filesystem';
export * from './functions/objects';
export declare let testFs: {
    debugging: {
        logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
    };
    evaluate: {
        countMatches: (content: string, search: string) => number;
        fileExists: (filePath: string) => boolean;
    };
    filesystem: {
        copyRealModules: (destModulesDir: string, moduleNames: string[], sourceModulesDir?: string) => void;
        fileExists: (filePath: string) => boolean;
        removeDirectory: (dirPath: string) => Promise<any>;
        setUp: {
            afterEach: () => Promise<any>;
            beforeEach: () => Promise<any | void>;
            createTempDir: (exists?: boolean) => Promise<any | void>;
            setDefaults: (dirPath?: string) => void;
        };
        writeFixtureFile: (filePath: string, content: string) => void;
        writePackageJson: (dirPath: string, fields: Record<string, any>) => void;
    };
    objects: {
        circularObject: {
            name: string;
            parent: null;
            body: import("./functions/objects").jsonDomItem | null;
            head: import("./functions/objects").jsonDomItem | null;
            children: import("./functions/objects").jsonDomItem[] | [];
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
        domItem: import("./functions/objects").jsonDomItem[];
        jsonDom: import("./functions/objects").jsonDomItem;
        linkedList: import("./functions/objects").linker;
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
        nodeTree: import("./functions/objects").treeLinker;
    };
};
export declare let testFsBrowser: {
    debugging: {
        logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
    };
    evaluate: {
        countMatches: (content: string, search: string) => number;
        fileExists: (filePath: string) => boolean;
    };
    objects: {
        circularObject: {
            name: string;
            parent: null;
            body: import("./functions/objects").jsonDomItem | null;
            head: import("./functions/objects").jsonDomItem | null;
            children: import("./functions/objects").jsonDomItem[] | [];
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
        domItem: import("./functions/objects").jsonDomItem[];
        jsonDom: import("./functions/objects").jsonDomItem;
        linkedList: import("./functions/objects").linker;
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
        nodeTree: import("./functions/objects").treeLinker;
    };
};

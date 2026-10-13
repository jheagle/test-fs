/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 */
export * from './filesystem/copyRealModules';
export * from './filesystem/fileExists';
export * from './filesystem/removeDirectory';
export * from './filesystem/setUp';
export * from './filesystem/writeFixtureFile';
export * from './filesystem/writePackageJson';
export declare let filesystem: {
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

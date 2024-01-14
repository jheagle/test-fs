/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>}
 */
export declare const afterEach: () => Promise<any>;
/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true]
 * @returns {Promise<*|void>}
 */
export declare const createTempDir: (exists?: boolean) => Promise<any | void>;
/**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>}
 */
export declare const beforeEach: () => Promise<any | void>;
export declare const setDefaults: (dirPath?: string) => void;
export declare const setUp: {
    afterEach: () => Promise<any>;
    beforeEach: () => Promise<any | void>;
    createTempDir: (exists?: boolean) => Promise<any | void>;
    setDefaults: (dirPath?: string) => void;
};
export default setUp;

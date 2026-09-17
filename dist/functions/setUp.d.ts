/**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>} Resolves once the temp directory (tempDir, see {@link setDefaults}) has been removed.
 */
export declare const afterEach: () => Promise<any>;
/**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true] - Whether the temp directory currently exists. Callers normally omit this; it's
 * used internally to recurse until removeDirectory reports the directory is gone, then create it fresh.
 * @returns {Promise<*|void>} Resolves once the temp directory has been removed and recreated.
 */
export declare const createTempDir: (exists?: boolean) => Promise<any | void>;
/**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>} Resolves once the temp directory (tempDir, see {@link setDefaults}) has been created.
 */
export declare const beforeEach: () => Promise<any | void>;
/**
 * Override the temp directory path used by {@link afterEach}, {@link beforeEach}, and {@link createTempDir}. Call
 * this once, before your tests run, if the default ('test-temp/') doesn't suit your project.
 * @function
 * @memberOf module:test-fs
 * @param {string} [dirPath=null] - The directory path to use for temp files instead of the default. Ignored (the
 * existing default stays in effect) if falsy.
 * @returns {void}
 */
export declare const setDefaults: (dirPath?: string) => void;
export declare const setUp: {
    afterEach: () => Promise<any>;
    beforeEach: () => Promise<any | void>;
    createTempDir: (exists?: boolean) => Promise<any | void>;
    setDefaults: (dirPath?: string) => void;
};
export default setUp;

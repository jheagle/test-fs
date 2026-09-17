/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath - The path of the directory to remove, if it exists.
 * @returns {Promise<*>} Resolves with dirPath once removed (or immediately, if it didn't exist); rejects with the
 * removal error otherwise.
 */
export declare const removeDirectory: (dirPath: string) => Promise<any>;

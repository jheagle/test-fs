/**
 * Return a promise to be completed once the specified directory is deleted.
 * @param dirPath - The path of the directory to remove, if it exists.
 * @returns Resolves with dirPath once removed (or immediately, if it didn't exist); rejects with the
 * removal error otherwise.
 */
export declare const removeDirectory: (dirPath: string) => Promise<any>;

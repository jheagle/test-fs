/**
 * Copy real, installed node_modules packages into a destination directory, for use as realistic test fixtures
 * instead of hand-written stand-ins.
 * @function
 * @memberOf module:test-fs
 * @param {string} destModulesDir - The destination node_modules-style directory to copy each package into.
 * @param {Array<string>} moduleNames - The package names to copy.
 * @param {string} [sourceModulesDir='./node_modules'] - The source node_modules directory to copy each package from.
 * @returns {undefined}
 */
export declare const copyRealModules: (destModulesDir: string, moduleNames: string[], sourceModulesDir?: string) => void;

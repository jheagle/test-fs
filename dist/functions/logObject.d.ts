/**
 * Log out an object in a nicely formatted way.
 * @function
 * @memberOf module:test-fs
 * @param {Object} object
 * @param {string} [label=logging]
 * @param {string} [outputType=log]
 * @param {boolean} [forceOutputType=false] - If true, use specified output regardless of environment.
 * @returns {string|undefined}
 */
export declare const logObject: (object: any, label?: string, outputType?: 'debug' | 'error' | 'log' | 'string' | 'warn', forceOutputType?: boolean) => string | void;

import { isBrowser, isNode } from 'browser-or-node'
import { inspect } from 'util'

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
export const logObject = (object: any, label: string = 'logging', outputType: 'debug' | 'error' | 'log' | 'string' | 'warn' = 'log', forceOutputType: boolean = false): string | void => {
  if (!forceOutputType && isBrowser && isNode && outputType !== 'string') {
    if (typeof console['warn'] === 'function') {
      console['warn'](`You may be running node but with a valid window object. Output type will be forced to 'string' instead of '${outputType}'`)
    }
    outputType = 'string'
  }
  const logger = outputType === 'string' ? (label: string, object: any): string | void => `'${label}' | ` + JSON.stringify(object) : console[outputType]
  if ((!forceOutputType && isBrowser) || outputType === 'string') {
    return logger(label, object)
  }
  return logger(label, inspect(object, false, null, true))
}

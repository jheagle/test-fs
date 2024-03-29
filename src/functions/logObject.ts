import { isBrowser } from 'browser-or-node'

/**
 * Log out an object in a nicely formatted way.
 * @function
 * @memberOf module:test-fs
 * @param {Object} object
 * @param {string} [label=logging]
 * @param {string} [outputType=log]
 * @returns {string|undefined}
 */
export const logObject = (object: any, label: string = 'logging', outputType: 'debug' | 'error' | 'log' | 'string' | 'warn' = 'log'): string | void => {
  const logger = outputType === 'string' ? (label: string, object: any): string | void => `'${label}' | ` + JSON.stringify(object) : console[outputType]
  if (isBrowser || outputType === 'string') {
    return logger(label, object)
  }
  return logger(label, require('util').inspect(object, false, null, true))
}

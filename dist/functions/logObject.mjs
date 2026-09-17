import { isBrowser, isNode } from 'browser-or-node'
import { inspect } from 'util'
/**
 * Log out an object in a nicely formatted way.
 * @function
 * @memberOf module:test-fs
 * @param {Object} object - The object (or any value) to log.
 * @param {string} [label=logging] - A label printed alongside the object, to identify this log call.
 * @param {string} [outputType=log] - Which console method to use ('debug'|'error'|'log'|'warn'), or 'string' to
 * return a formatted string instead of logging.
 * @param {boolean} [forceOutputType=false] - If true, use specified output regardless of environment.
 * @returns {string|undefined} The formatted string when outputType is 'string' (or forced to it); otherwise
 * undefined, since the object is logged directly to the console.
 */
export const logObject = (object, label = 'logging', outputType = 'log', forceOutputType = false) => {
  if (!forceOutputType && isBrowser && isNode && outputType !== 'string') {
    if (typeof console.warn === 'function') {
      console.warn(`You may be running node but with a valid window object. Output type will be forced to 'string' instead of '${outputType}'`)
    }
    outputType = 'string'
  }
  const logger = outputType === 'string' ? (label, object) => `'${label}' | ` + JSON.stringify(object) : console[outputType]
  if ((!forceOutputType && isBrowser) || outputType === 'string') {
    return logger(label, object)
  }
  return logger(label, inspect(object, false, null, true))
}

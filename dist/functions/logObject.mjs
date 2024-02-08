/**
 * Log out an object in a nicely formatted way.
 * @function
 * @memberOf module:test-fs
 * @param {Object} object
 * @param {string} [label=logging]
 * @param {string} [outputType=log]
 * @returns {string|undefined}
 */
export const logObject = (object, label = 'logging', outputType = 'log') => {
  const logger = outputType === 'string' ? (label, object) => `'${label}' | ` + JSON.stringify(object) : console[outputType]
  if (typeof require === 'undefined' || outputType === 'string') {
    return logger(label, object)
  }
  return logger(label, require('util').inspect(object, false, null, true))
}
export default logObject
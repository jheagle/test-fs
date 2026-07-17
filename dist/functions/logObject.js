'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.logObject = void 0
var _browserOrNode = require('browser-or-node')
var _util = require('util')
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
const logObject = (object, label = 'logging', outputType = 'log', forceOutputType = false) => {
  if (!forceOutputType && _browserOrNode.isBrowser && _browserOrNode.isNode && outputType !== 'string') {
    if (typeof console.warn === 'function') {
      console.warn(`You may be running node but with a valid window object. Output type will be forced to 'string' instead of '${outputType}'`)
    }
    outputType = 'string'
  }
  const logger = outputType === 'string' ? (label, object) => `'${label}' | ` + JSON.stringify(object) : console[outputType]
  if (!forceOutputType && _browserOrNode.isBrowser || outputType === 'string') {
    return logger(label, object)
  }
  return logger(label, (0, _util.inspect)(object, false, null, true))
}
exports.logObject = logObject

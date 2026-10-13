'use strict'

require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
var _exportNames = {
  debugging: true,
  debuggingBrowser: true
}
exports.debuggingBrowser = exports.debugging = void 0
var _logObject = require('./debugging/logObject')
Object.keys(_logObject).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _logObject[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logObject[key]
    }
  })
})
/**
 * Functions to use while debugging code and tests.
 */

const debugging = exports.debugging = {
  logObject: _logObject.logObject
}
const debuggingBrowser = exports.debuggingBrowser = {
  logObject: _logObject.logObject
}

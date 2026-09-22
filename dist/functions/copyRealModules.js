'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.copyRealModules = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
var _fs = require('fs')
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
const copyRealModules = (destModulesDir, moduleNames, sourceModulesDir = './node_modules') => moduleNames.forEach(moduleName => (0, _fs.cpSync)(`${sourceModulesDir}/${moduleName}`, `${destModulesDir}/${moduleName}`, {
  recursive: true
}))
exports.copyRealModules = copyRealModules

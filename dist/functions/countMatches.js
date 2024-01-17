'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = exports.countMatches = void 0
/**
 * Simple way to count string occurrences for testing.
 * @function
 * @memberOf module:test-fs
 * @param {string} content
 * @param {string} search
 * @returns {number}
 */
const countMatches = (content, search) => content.split(search).length - 1
exports.countMatches = countMatches
var _default = exports.default = countMatches

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.countMatches = void 0
/**
 * Simple way to count string occurrences for testing.
 * @function
 * @memberOf module:test-fs
 * @param {string} content - The text to search within.
 * @param {string} search - The substring to count occurrences of.
 * @returns {number} How many times search occurs in content.
 */
const countMatches = (content, search) => content.split(search).length - 1
exports.countMatches = countMatches

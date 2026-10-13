'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.countMatches = void 0
/**
 * Simple way to count string occurrences for testing.
 * @param content - The text to search within.
 * @param search - The substring to count occurrences of.
 * @returns How many times search occurs in content.
 */
const countMatches = (content, search) => content.split(search).length - 1
exports.countMatches = countMatches

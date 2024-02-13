/**
 * Simple way to count string occurrences for testing.
 * @function
 * @memberOf module:test-fs
 * @param {string} content
 * @param {string} search
 * @returns {number}
 */
export const countMatches = (content, search) => content.split(search).length - 1

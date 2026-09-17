/**
 * Simple way to count string occurrences for testing.
 * @function
 * @memberOf module:test-fs
 * @param {string} content - The text to search within.
 * @param {string} search - The substring to count occurrences of.
 * @returns {number} How many times search occurs in content.
 */
export const countMatches = (content: string, search: string): number => content.split(search).length - 1

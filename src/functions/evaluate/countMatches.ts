/**
 * Simple way to count string occurrences for testing.
 * @param content - The text to search within.
 * @param search - The substring to count occurrences of.
 * @returns How many times search occurs in content.
 */
export const countMatches = (content: string, search: string): number => content.split(search).length - 1

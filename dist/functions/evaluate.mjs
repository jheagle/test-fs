/**
 * Functions that can be used in assertions/evals in tests.
 */
import { countMatches } from './evaluate/countMatches.mjs';
import { fileExists } from './filesystem/fileExists.mjs';
export * from './evaluate/countMatches.mjs';
export * from './filesystem/fileExists.mjs';
export const evaluate = {
    countMatches,
    fileExists,
};
export const evaluateBrowser = {
    countMatches,
};

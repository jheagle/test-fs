/**
 * Functions that can be used in assertions/evals in tests.
 */
import { countMatches } from './evaluate/countMatches'
import { fileExists } from './filesystem/fileExists'

export * from './evaluate/countMatches'
export * from './filesystem/fileExists'

export let evaluate = {
  countMatches,
  fileExists,
}

export let evaluateBrowser = {
  countMatches,
}

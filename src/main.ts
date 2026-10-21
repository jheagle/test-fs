/**
 * All of the features available in test-filesystem
 */

import { debugging } from './functions/debugging'
import { evaluate } from './functions/evaluate'
import { filesystem } from './functions/filesystem'
import { objects } from './functions/objects'

export * from './functions/debugging'
export * from './functions/evaluate'
export * from './functions/filesystem'
export * from './functions/objects'

export const testFs = {
  debugging,
  evaluate,
  filesystem,
  objects,
}

export const testFsBrowser = {
  debugging,
  evaluate,
  objects,
}

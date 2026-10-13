/**
 * All of the features available in test-filesystem
 */
import { debugging } from './functions/debugging.mjs'
import { evaluate } from './functions/evaluate.mjs'
import { filesystem } from './functions/filesystem.mjs'
import { objects } from './functions/objects.mjs'
export * from './functions/debugging.mjs'
export * from './functions/evaluate.mjs'
export * from './functions/filesystem.mjs'
export * from './functions/objects.mjs'
export const testFs = {
  debugging,
  evaluate,
  filesystem,
  objects
}
export const testFsBrowser = {
  debugging,
  evaluate,
  objects
}

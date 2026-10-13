/**
 * Functions to use while debugging code and tests.
 */
import { logObject } from './debugging/logObject'

export * from './debugging/logObject'

export let debugging = {
  logObject,
}

export let debuggingBrowser = {
  logObject,
}

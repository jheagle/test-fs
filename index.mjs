/**
 * Use this file to test mjs exports
 */
import { circularObject, logObject } from './dist/main.mjs'

logObject(circularObject, 'circularObject')

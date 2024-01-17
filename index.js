/**
 * Use this file to test common js exports
 */
const { circularObject, logObject } = require('./dist/main.js')

logObject(circularObject, 'circularObject')

import { logObject } from './logObject'
import util from 'util'

let logSpy
let inspectSpy

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn())
  inspectSpy = jest.spyOn(util, 'inspect')
})

afterEach(() => {
  logSpy.mockRestore()
  inspectSpy.mockRestore()
})

describe('logObject - node.js', () => {
  test('can nicely output objects', () => {
    const someObject = { one: 1, two: 2, three: 3 }
    logObject(someObject, 'someObject')
    expect(inspectSpy).toHaveBeenCalledWith(someObject, false, null, true)
    expect(logSpy).toHaveBeenCalledWith('someObject', util.inspect(someObject, false, null, true))
  })

  test('output to string when that argument is provided', () => {
    const someObject = { one: 1, two: 2, three: 3 }
    const label = 'someObject'
    const result = logObject(someObject, label, 'string')
    expect(result).toEqual(`'${label}' | ` + JSON.stringify(someObject))
  })
})

/**
 * @jest-environment jsdom
 */
import { logObject } from './logObject'
import util from 'util'

let warnSpy

beforeEach(() => {
  warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn())
})

afterEach(() => {
  warnSpy.mockRestore()
})

describe('logObject - browser', () => {
  test('can nicely output objects', () => {
    const someObject = { one: 1, two: 2, three: 3 }
    expect(logObject(someObject, 'someObject')).toEqual(`'someObject' | ` + JSON.stringify(someObject))
    expect(warnSpy).toHaveBeenCalledWith('You may be running node but with a valid window object. Output type will be forced to \'string\' instead of \'log\'')
  })

  test('output to string when that argument is provided', () => {
    const someObject = { one: 1, two: 2, three: 3 }
    const label = 'someObject'
    const result = logObject(someObject, label, 'string')
    expect(result).toEqual(`'${label}' | ` + JSON.stringify(someObject))
  })
})

import { setUp } from './setUp'
import { existsSync } from 'fs'

const dirName = 'test-temp/'

setUp.setDefaults(dirName)

describe('setUp', () => {
  test('able to create the test-temp/src directory', async () => {
    expect(existsSync(`${dirName}src`)).toBeFalsy()
    await setUp.createTempDir()
    expect(existsSync(`${dirName}src`)).toBeTruthy()
  })

  test('able to delete the test-temp/src directory', async () => {
    expect(existsSync(`${dirName}src`)).toBeTruthy()
    await setUp.afterEach()
    expect(existsSync(`${dirName}src`)).toBeFalsy()
  })
})

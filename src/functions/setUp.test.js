import { setUp } from './setUp'
import { fileExists } from './fileExists'

const dirName = 'test-temp/'

setUp.setDefaults(dirName)

describe('setUp', () => {
  test('able to create the test-temp/src directory', async () => {
    expect(fileExists(`${dirName}src`)).toBeFalsy()
    await setUp.createTempDir()
    expect(fileExists(`${dirName}src`)).toBeTruthy()
  })

  test('able to delete the test-temp/src directory', async () => {
    expect(fileExists(`${dirName}src`)).toBeTruthy()
    await setUp.afterEach()
    expect(fileExists(`${dirName}src`)).toBeFalsy()
  })
})

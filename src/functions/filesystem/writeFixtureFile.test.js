import { writeFixtureFile } from './writeFixtureFile'
import { fileExists } from './fileExists'
import { removeDirectory } from './removeDirectory'
import { readFileSync } from 'fs'

const tempDir = 'test-write-fixture-file'

afterEach(() => removeDirectory(tempDir))

describe('writeFixtureFile', () => {
  test('creates missing parent directories before writing the file', () => {
    const filePath = `${tempDir}/nested/deep/example.txt`
    expect(fileExists(filePath)).toBeFalsy()
    writeFixtureFile(filePath, 'example content')
    expect(fileExists(filePath)).toBeTruthy()
    expect(readFileSync(filePath).toString()).toBe('example content')
  })

  test('overwrites an existing file', () => {
    const filePath = `${tempDir}/example.txt`
    writeFixtureFile(filePath, 'first')
    writeFixtureFile(filePath, 'second')
    expect(readFileSync(filePath).toString()).toBe('second')
  })
})

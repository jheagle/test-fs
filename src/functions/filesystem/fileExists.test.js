import { fileExists } from './fileExists'

describe('fileExists', () => {
  test('can find a valid file', () => {
    expect(fileExists('src/functions/filesystem/fileExists.ts')).toBeTruthy()
  })

  test('can detect invalid file', () => {
    expect(fileExists('src/functions/filesystem/fileExists.js')).toBeFalsy()
  })
})

import removeDirectory from './removeDirectory'
import fileExists from './fileExists'
import { mkdirSync } from 'fs'

describe('removeDirectory', () => {
  test('able to delete the remove-directory', async () => {
    const dirPath = 'remove-directory'
    mkdirSync(dirPath)
    expect(fileExists(dirPath)).toBeTruthy()
    await removeDirectory(dirPath)
    expect(fileExists(dirPath)).toBeFalsy()
  })

  test('able to delete directory with sub-directories', async () => {
    const dirPath = 'remove-directory'
    mkdirSync(dirPath)
    const subDir = `${dirPath}/sub`
    mkdirSync(subDir)
    expect(fileExists(subDir)).toBeTruthy()
    await removeDirectory(dirPath)
    expect(fileExists(subDir)).toBeFalsy()
  })

  test('ends cleanly if directory does not exist', async () => {
    const dirPath = 'remove-directory'
    expect(fileExists(dirPath)).toBeFalsy()
    expect(await removeDirectory(dirPath)).toBe(dirPath)
  })
})

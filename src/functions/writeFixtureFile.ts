import { dirname } from 'path'
import { mkdirSync, writeFileSync } from 'fs'

/**
 * Write a file, creating any missing parent directories first.
 * @function
 * @memberOf module:test-fs
 * @param {string} filePath - The path of the file to write.
 * @param {string} content - The content to write into the file.
 * @returns {undefined}
 */
export const writeFixtureFile = (filePath: string, content: string): void => {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, content)
}

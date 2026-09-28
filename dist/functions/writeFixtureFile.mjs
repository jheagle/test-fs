import { dirname } from 'path'
import { mkdirSync, writeFileSync } from 'fs'
/**
 * Write a file, creating any missing parent directories first.
 * @param filePath - The path of the file to write.
 * @param content - The content to write into the file.
 */
export const writeFixtureFile = (filePath, content) => {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, content)
}

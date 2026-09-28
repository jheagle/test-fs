import { accessSync, constants } from 'fs'

/**
 * Detect if a file exists and is usable.
 * @param filePath - The path of the file to check.
 * @returns True if the file exists and is accessible.
 */
export const fileExists = (filePath: string): boolean => {
  try {
    accessSync(filePath, constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 */
import { copyRealModules } from './filesystem/copyRealModules.mjs'
import { fileExists } from './filesystem/fileExists.mjs'
import { removeDirectory } from './filesystem/removeDirectory.mjs'
import { setUp } from './filesystem/setUp.mjs'
import { writeFixtureFile } from './filesystem/writeFixtureFile.mjs'
import { writePackageJson } from './filesystem/writePackageJson.mjs'
export * from './filesystem/copyRealModules.mjs'
export * from './filesystem/fileExists.mjs'
export * from './filesystem/removeDirectory.mjs'
export * from './filesystem/setUp.mjs'
export * from './filesystem/writeFixtureFile.mjs'
export * from './filesystem/writePackageJson.mjs'
export const filesystem = {
  copyRealModules,
  fileExists,
  removeDirectory,
  setUp,
  writeFixtureFile,
  writePackageJson
}

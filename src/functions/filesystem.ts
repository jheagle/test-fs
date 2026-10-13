/**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 */

import { copyRealModules } from './filesystem/copyRealModules'
import { fileExists } from './filesystem/fileExists'
import { removeDirectory } from './filesystem/removeDirectory'
import { setUp } from './filesystem/setUp'
import { writeFixtureFile } from './filesystem/writeFixtureFile'
import { writePackageJson } from './filesystem/writePackageJson'

export * from './filesystem/copyRealModules'
export * from './filesystem/fileExists'
export * from './filesystem/removeDirectory'
export * from './filesystem/setUp'
export * from './filesystem/writeFixtureFile'
export * from './filesystem/writePackageJson'

export let filesystem = {
  copyRealModules,
  fileExists,
  removeDirectory,
  setUp,
  writeFixtureFile,
  writePackageJson,
}

import { writeFixtureFile } from './writeFixtureFile'

/**
 * Write a package.json file for a directory, creating any missing parent directories first. Parses and
 * re-serializes with a plain 2-space indent regardless of how `fields` was built, so callers never need to worry
 * about matching JSON formatting by hand.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath - The directory to write the package.json file into.
 * @param {Object<string, *>} fields - The package.json fields to write.
 * @returns {undefined}
 */
export const writePackageJson = (dirPath: string, fields: Record<string, any>): void =>
  writeFixtureFile(`${dirPath}/package.json`, JSON.stringify(fields, null, 2) + '\n')

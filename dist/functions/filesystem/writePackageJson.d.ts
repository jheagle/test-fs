/**
 * Write a package.json file for a directory, creating any missing parent directories first. Parses and
 * re-serializes with a plain 2-space indent regardless of how `fields` was built, so callers never need to worry
 * about matching JSON formatting by hand.
 * @param dirPath - The directory to write the package.json file into.
 * @param fields - The package.json fields to write.
 */
export declare const writePackageJson: (dirPath: string, fields: Record<string, any>) => void;

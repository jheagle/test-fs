import { cpSync } from 'fs'
/**
 * Copy real, installed node_modules packages into a destination directory, for use as realistic test fixtures
 * instead of hand-written stand-ins.
 * @param destModulesDir - The destination node_modules-style directory to copy each package into.
 * @param moduleNames - The package names to copy.
 * @param sourceModulesDir - The source node_modules directory to copy each package from.
 */
export const copyRealModules = (destModulesDir, moduleNames, sourceModulesDir = './node_modules') => moduleNames.forEach((moduleName) => cpSync(`${sourceModulesDir}/${moduleName}`, `${destModulesDir}/${moduleName}`, { recursive: true }))

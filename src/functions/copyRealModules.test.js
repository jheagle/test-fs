import { copyRealModules } from './copyRealModules'
import { fileExists } from './fileExists'
import { removeDirectory } from './removeDirectory'
import { mkdirSync } from 'fs'

const tempDir = 'test-copy-real-modules'
const modulesPath = `${tempDir}/node_modules`

afterEach(() => removeDirectory(tempDir))

describe('copyRealModules', () => {
  test('copies a real installed package into the destination, preserving its own contents', () => {
    mkdirSync(modulesPath, { recursive: true })
    copyRealModules(modulesPath, ['browser-or-node'])
    expect(fileExists(`${modulesPath}/browser-or-node/package.json`)).toBeTruthy()
  })

  test('copies multiple packages in one call', () => {
    mkdirSync(modulesPath, { recursive: true })
    copyRealModules(modulesPath, ['browser-or-node', 'vinyl-source-stream'])
    expect(fileExists(`${modulesPath}/browser-or-node/package.json`)).toBeTruthy()
    expect(fileExists(`${modulesPath}/vinyl-source-stream/package.json`)).toBeTruthy()
  })

  test('supports a custom source directory', () => {
    mkdirSync(modulesPath, { recursive: true })
    copyRealModules(modulesPath, ['browser-or-node'], './node_modules')
    expect(fileExists(`${modulesPath}/browser-or-node/package.json`)).toBeTruthy()
  })
})

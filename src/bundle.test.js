/**
 * @jest-environment node
 */
import { build } from 'esbuild'
import { rmSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import vm from 'vm'

// The same options the build's bundle task uses, bundling the TypeScript source directly (esbuild compiles it), so
// this test never depends on dist/ or browser/ having been built first.
const bundleOptions = createRequire(`${process.cwd()}/package.json`)('./bundle.config.cjs')

let bundleCode = ''

beforeAll(async () => {
  const result = await build({ ...bundleOptions('src/browser.ts'), write: false, outfile: 'test-fs.js' })
  bundleCode = result.outputFiles[0].text
})

/**
 * Run the bundle the way a <script> tag does: a fresh global with a window and document, and no module, require,
 * process or Node globals.
 */
const runAsScript = () => {
  const logged = []
  const context = vm.createContext({
    console: { log: (...args) => logged.push(args), warn: () => {} }
  })
  context.window = context
  context.document = {}
  vm.runInContext(bundleCode, context)
  return { testFs: context.testFs, logged }
}

describe('browser bundle', () => {
  test('a script tag gets the testFs global with its three groups', () => {
    const { testFs } = runAsScript()
    expect(Object.keys(testFs).sort()).toEqual(['debugging', 'evaluate', 'objects'])
    expect(typeof testFs.debugging.logObject).toBe('function')
    expect(testFs.evaluate.countMatches('aXbXc', 'X')).toBe(2)
  })

  test('require() of the bundle gives the same groups', () => {
    const module = { exports: {} }
    vm.runInNewContext(bundleCode, { module, window: undefined, console })
    expect(Object.keys(module.exports).sort()).toEqual(['debugging', 'evaluate', 'objects'])
  })

  test('logObject in the browser: plain output, and util.inspect when forceOutputType is true', () => {
    const { testFs, logged } = runAsScript()
    testFs.debugging.logObject({ a: 1 }, 'plain')
    testFs.debugging.logObject({ a: 1 }, 'forced', 'log', true)
    expect(testFs.debugging.logObject({ a: 1 }, 'label', 'string')).toBe('\'label\' | {"a":1}')
    expect(logged[0]).toEqual(['plain', { a: 1 }])
    // util.inspect's coloured output, from the bundled util package
    expect(logged[1]).toEqual(['forced', '{ a: \u001b[33m1\u001b[39m }'])
  })

  test('any other Node built-in fails the build instead of shipping empty', async () => {
    const entry = 'test-temp-bundle-entry.js'
    writeFileSync(entry, 'module.exports = require(\'fs\').readFileSync\n')
    try {
      await expect(build({ ...bundleOptions(entry), write: false, outfile: 'test-fs.js', logLevel: 'silent' })).rejects.toThrow('fs')
    } finally {
      rmSync(entry, { force: true })
    }
  })
})

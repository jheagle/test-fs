/**
 * The esbuild options for the browser bundle (browser/test-fs.js), shared by gulpfile.mjs's bundle task and
 * src/bundle.test.js, so the test checks the same settings the build uses.
 *
 * Built as a plain script exposing the global `testFs` (the name browserify's `standalone: 'test-fs'` gave it),
 * with a CommonJS footer so `require()` of the file still works; AMD loaders are no longer supported.
 *
 * Node's `util` resolves to the `util` package (the browser port browserify used to bundle): logObject calls
 * `util.inspect` in the browser when forceOutputType is true. Any other Node built-in fails the build, so a new one
 * reaching the browser entry gets noticed instead of shipped empty. The util package reads `process`
 * (process.env.NODE_DEBUG and others), so a free `process` gets the `process` package's browser version injected,
 * as browserify did.
 *
 * Not js-build-tools' own bundle task: js-build-tools depends on this package, so this project keeps its own.
 * @param {string} entry - the entry file
 * @returns {Object} esbuild build options, without the output settings
 */
const processModule = 'test-fs:process'

/** Provides the module injected for a free `process` (esbuild's inject needs an ES module exporting it). */
const processShim = {
  name: 'process-shim',
  setup (build) {
    build.onResolve({ filter: /^test-fs:process$/ }, () => ({ path: 'process', namespace: 'process-shim' }))
    build.onLoad({ filter: /.*/, namespace: 'process-shim' }, () => ({
      contents: `export { default as process } from ${JSON.stringify(require.resolve('process/browser.js'))}`,
      resolveDir: __dirname,
      loader: 'js'
    }))
  }
}

module.exports = (entry) => ({
  entryPoints: [entry],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  globalName: 'testFs',
  mainFields: ['browser', 'main'],
  define: { global: 'globalThis' },
  footer: { js: 'if (typeof module === \'object\' && module && module.exports) { module.exports = testFs }' },
  alias: { util: require.resolve('util/') },
  inject: [processModule],
  plugins: [processShim],
  logLevel: 'warning'
})

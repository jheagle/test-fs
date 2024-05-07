import Module from 'node:module'
import { dest, parallel, series, src } from 'gulp'
import { access, appendFileSync, constants, rm } from 'fs'
import { globSync } from 'glob'

const require = Module.createRequire(import.meta.url)

const babel = require('gulp-babel')
const browserify = require('browserify')
const jsdoc2md = require('jsdoc-to-markdown')
const rename = require('gulp-rename')
const { runCLI } = require('jest')
const source = require('vinyl-source-stream')
const standard = require('gulp-standard')
const through = require('through2')
const ts = require('gulp-typescript')
const { default: uglify } = require('gulp-uglify-es')

const browserName = 'test-fs'
const browserPath = 'browser'
const cleanFolders = ['dist', 'browser']
const distSearch = 'dist/**/*js'
const distMain = 'dist/main'
const distPath = 'dist'
const srcSearch = 'src/**/*.ts'
const readmeTemplate = 'MAIN.md'
const readmeFile = 'README.md'
const readmePath = './'
const readmeSearch = 'dist/**/*.js'
const readmeOptions = 'utf8'
const testPath = ['src']
const testOptions = {
  clearCache: false,
  debug: false,
  ignoreProjects: false,
  json: false,
  selectProjects: false,
  showConfig: false,
  useStderr: false,
  watch: false,
  watchAll: false,
}
const tsSearch = `${distPath}/**/*.mjs`

/**
 * Replace parts of the import statements.
 * @function
 * @param {string} contents
 * @param {string} replaceWith
 * @return {string}
 */
const importReplace = (contents, replaceWith) => contents
  .replaceAll(
    /(export|import) ({?.+}?) from (['"])(\.+\/[a-zA-Z-_\/]+)(\.[a-z]{2,3})?['"]/g,
    replaceWith
  )

/**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath
 * @returns {Promise<*>}
 */
const removeDirectory = (dirPath) => new Promise(
  (resolve, reject) => access(
    dirPath,
    constants.F_OK,
    (removed) => removed
      ? resolve(dirPath)
      : rm(
        dirPath,
        { recursive: true },
        (error) => error ? reject(error) : resolve(dirPath)
      )
  )
)

/**
 * Deletes all the distribution and browser files (used before create a new build).
 * Configure array of directories to remove with 'cleanPaths'.
 * @function
 * @returns {Promise<string[]> | *}
 */
export const clean = () => cleanFolders.reduce(
  (promise, path) => promise.then(() => removeDirectory(path)),
  Promise.resolve()
)

/**
 * Starting at the source directory, find all the ts files and convert them into the distribution directory.
 * @function
 * @returns {Function}
 * @see `https://www.typescriptlang.org/docs/handbook/gulp.html` for more info
 */
export const typescript = () => {
  const tsResult = src(srcSearch)
    .pipe(ts({
      declaration: true,
      moduleResolution: 'node',
      target: 'es6',
      module: 'es2020'
    }))
  // Output the type definitions
  tsResult.dts.pipe(dest(distPath))
  // Create the runnable code
  return tsResult.js
    .pipe(through.obj(function (file, enc, cb) {
      file.contents = Buffer.from(importReplace(file.contents.toString(), '$1 $2 from $3$4.mjs$3'))
      this.push(file)
      cb()
    }))
    .pipe(rename({ extname: '.mjs' }))
    .pipe(dest(distPath))
}

/**
 * Convert to babel files.
 * @function
 * @return {stream.Stream}
 */
export const dist = () => src(tsSearch)
  .pipe(through.obj(function (file, enc, cb) {
    file.contents = Buffer.from(importReplace(file.contents.toString(), '$1 $2 from $3$4$3'))
    this.push(file)
    cb()
  }))
  .pipe(babel())
  .pipe(dest(distPath))

/**
 * When using TypeScript, ensure that we process the ts first then run babel (dist)
 * @function
 * @returns {function(null=): stream.Stream}
 */
const distSeries = (done = null) => series(typescript, dist)(done)

/**
 * Applies Standard code style linting to distribution files.
 * @function
 * @returns {*}
 */
const distLint = () => src(distSearch)
  .pipe(standard({ fix: true }))
  .pipe(standard.reporter('default', {
    fix: true,
    quiet: true
  }))
  .pipe(dest(distPath))

/**
 * Copy a readme template into the README.md file.
 * @function
 * @returns {*}
 */
const createReadme = () => src(readmeTemplate)
  .pipe(rename(readmeFile))
  .pipe(dest(readmePath))

/**
 * Appends all the jsdoc comments to the readme file. Assumes empty or templated file.
 * Configure this with 'readmeSearch', 'readmePath', 'readmeFile', and 'readmeOptions'.
 * @function
 * @returns {string|Uint8Array}
 */
const addToReadme = () => jsdoc2md
  .render({ files: globSync(readmeSearch) })
  .then(
    readme => appendFileSync(readmePath + readmeFile, readme, readmeOptions)
  )

/**
 * Generate the readme file.
 * @function
 * @return {*}
 */
export const readme = (done = null) => series(createReadme, addToReadme)(done)

/**
 * Starting at the distribution entry point, bundle all the files into a single file and store them in the specified output directory.
 * @function
 * @returns {stream.Stream}
 */
export const bundle = () => browserify(distMain)
  .bundle()
  .pipe(source(`${browserName}.js`))
  .pipe(dest(browserPath))

/**
 * Applies Standard code style linting to bundled file.
 * @function
 * @returns {stream.Stream}
 */
const bundleLint = () => src(`${browserPath}/${browserName}.js`)
  .pipe(standard({ fix: true }))
  .pipe(standard.reporter('default', {
    fix: true,
    quiet: true
  }))
  .pipe(dest(browserPath))

/**
 * Creates the minified bundle file.
 * @function
 * @returns {*}
 */
const bundleMinify = () => src(`${browserPath}/${browserName}.js`)
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(browserPath))

/**
 * Run all tests with jest.
 * Configure where tests are located by using 'testPath'.
 * @function
 * @returns {Promise<*>}
 */
export const testFull = () => runCLI(testOptions, testPath)

export const build = (done = null) => parallel(
  series(
    clean,
    distSeries,
    distLint,
    readme,
    bundle,
    parallel(bundleLint, bundleMinify)
  ),
  testFull
)(done)

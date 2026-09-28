import { dest, parallel, series, src } from 'gulp'
import { access, constants, rm } from 'fs'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import babel from 'gulp-babel'
import browserify from 'browserify'
import rename from 'gulp-rename'
import { runCLI } from 'jest'
import source from 'vinyl-source-stream'
import standard from 'gulp-standard'
import through from 'through2'
import ts from 'typescript'
import tsCompile from 'gulp-ts-compile'
import uglifyEs from 'gulp-uglify-es'

const uglify = uglifyEs.default

const browserName = 'test-fs'
const browserPath = 'browser'
const cleanFolders = ['dist', 'browser']
const distSearch = 'dist/**/*js'
const distMain = 'dist/main'
const distPath = 'dist'
const srcSearch = 'src/**/*.ts'
const docsFrom = 'src'
const docsTo = '../joshuaheagle.local/projects/test-fs/docs'
const docsIndex = 'MAIN.md'
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
  (promise, folderPath) => promise.then(() => removeDirectory(folderPath)),
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
    .pipe(tsCompile({
      declaration: true,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ES2020
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

const isDocSource = fileName => /\.ts$/.test(fileName) && !/\.test\./.test(fileName)

const listDocSources = dirPath => fsSync.readdirSync(dirPath, { withFileTypes: true }).flatMap(entry => {
  const entryPath = path.join(dirPath, entry.name)
  if (entry.isDirectory()) {
    return entry.name === 'node_modules' ? [] : listDocSources(entryPath)
  }
  return isDocSource(entry.name) ? [entryPath] : []
})

const toModulePath = filePath => filePath.replace(/\.ts$/, '').split(path.sep).join('/')

/**
 * Write one entry file per top-level folder of docsFrom into entryDir, each re-exporting all of that folder's
 * source files - this is what makes TypeDoc's modules mirror the source folders (functions). Duplicated here
 * (not imported from js-build-tools) because js-build-tools itself depends on test-filesystem, and importing it
 * back would be a circular dependency.
 * @function
 * @param {string} srcDir
 * @param {string} entryDir
 * @returns {Array<string>}
 */
const writeDocEntries = (srcDir, entryDir) => {
  const absoluteSrc = path.resolve(srcDir)
  fsSync.mkdirSync(entryDir, { recursive: true })
  const folders = fsSync.readdirSync(absoluteSrc, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name !== 'node_modules')
    .map(entry => ({ name: entry.name, files: listDocSources(path.join(absoluteSrc, entry.name)) }))
    .filter(folder => folder.files.length)
  return folders.map(folder => {
    const lines = folder.files.sort().map(file => `export * from '${toModulePath(file)}'`)
    const entryPath = path.join(entryDir, `${folder.name}.ts`)
    fsSync.writeFileSync(entryPath, lines.join('\n') + '\n')
    return entryPath
  })
}

/**
 * Generate the HTML documentation from the TypeScript source with TypeDoc, straight into the sibling website
 * checkout. Configure this with 'docsFrom', 'docsTo' and 'docsIndex'.
 * @function
 * @returns {Promise<void>}
 */
export const docs = async () => {
  const { Application } = await import('typedoc')
  const workDir = fsSync.mkdtempSync(path.join(os.tmpdir(), 'typedocs-'))
  try {
    const entryPoints = writeDocEntries(docsFrom, path.join(workDir, 'entries'))
    const tsconfig = path.join(workDir, 'tsconfig.json')
    fsSync.writeFileSync(tsconfig, JSON.stringify({
      extends: path.resolve('tsconfig.json'),
      include: [
        path.join(workDir, 'entries', '*.ts').split(path.sep).join('/'),
        path.resolve(docsFrom).split(path.sep).join('/') + '/**/*.ts'
      ],
      exclude: [path.resolve(docsFrom).split(path.sep).join('/') + '/**/*.test.*']
    }))
    await removeDirectory(docsTo)
    const app = await Application.bootstrap({
      entryPoints,
      tsconfig,
      name: 'test-filesystem',
      readme: fsSync.existsSync(docsIndex) ? docsIndex : 'none',
      logLevel: 'Warn',
      skipErrorChecking: true
    })
    const project = await app.convert()
    if (!project) {
      throw new Error('TypeDoc could not read the TypeScript source, see the errors above.')
    }
    await app.generateDocs(project, docsTo)
  } finally {
    await removeDirectory(workDir)
  }
}

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
    docs,
    bundle,
    parallel(bundleLint, bundleMinify)
  ),
  testFull
)(done)

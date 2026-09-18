# test-fs
Set up and tear down a temp directory for running filesystem tests.

There are three options for accessing these functions:
1. CommonJs modules: dist/*.js (default)
2. ES6 modules: dist/*.mjs
3. Bundles Browser file: browser/test-fs.js

## Installation

In your project's root directory, run: `npm install --save-dev test-filesystem`
(or `yarn add --dev test-filesystem` if you use Yarn).

## Usage
To use the temporary directory in tests. Do the following in your tests:
```js
import { setUp } from 'test-filesystem'

// Setup the name for your temporary directory
const dirName = 'test-temp/'

// Use the name
setUp.setDefaults(dirName)

// use the beforeEach and afterEach methods of jest to run the setup and teardown functions
beforeEach(
  () => setUp.beforeEach()
    .then(
      () => {
        // Put any additional setup logic here
      }
    )
)

afterEach(
  () => setUp.afterEach()
    .then(
      () => {
        // Put any additional teardown logic here
      }
    )
)
```

<a name="module_test-fs"></a>

## test-fs
An assortment of objects that can be used in tests and some functions to help debug and write tests.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  

* [test-fs](#module_test-fs)
    * [.nodeTree](#module_test-fs.nodeTree) : <code>Object.&lt;string, (string\|Object\|Array)&gt;</code>
    * [.multiReferenceObject](#module_test-fs.multiReferenceObject) : <code>Object.&lt;string, (string\|number\|Object)&gt;</code>
    * [.linkedList](#module_test-fs.linkedList) : <code>Object.&lt;string, (string\|Object)&gt;</code>
    * [.jsonDom](#module_test-fs.jsonDom) : <code>Object.&lt;string, (string\|number\|Array\|Object)&gt;</code>
    * [.domItem](#module_test-fs.domItem) : <code>Object.&lt;string, (string\|number\|Array\|Object)&gt;</code>
    * [.deepReferenceObject](#module_test-fs.deepReferenceObject) : <code>Object.&lt;string, (string\|number\|Object)&gt;</code>
    * [.circularObject](#module_test-fs.circularObject) : <code>Object.&lt;string, (string\|Object\|Array)&gt;</code>
    * [.writePackageJson(dirPath, fields)](#module_test-fs.writePackageJson) ⇒ <code>undefined</code>
    * [.writeFixtureFile(filePath, content)](#module_test-fs.writeFixtureFile) ⇒ <code>undefined</code>
    * [.afterEach()](#module_test-fs.afterEach) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.exports.afterEach([exists])](#module_test-fs.exports.afterEach) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
    * [.exports.createTempDir()](#module_test-fs.exports.createTempDir) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
    * [.exports.beforeEach([dirPath])](#module_test-fs.exports.beforeEach) ⇒ <code>void</code>
    * [.removeDirectory(dirPath)](#module_test-fs.removeDirectory) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.logObject(object, [label], [outputType], [forceOutputType])](#module_test-fs.logObject) ⇒ <code>string</code> \| <code>undefined</code>
    * [.fileExists(filePath)](#module_test-fs.fileExists) ⇒ <code>boolean</code>
    * [.countMatches(content, search)](#module_test-fs.countMatches) ⇒ <code>number</code>
    * [.copyRealModules(destModulesDir, moduleNames, [sourceModulesDir])](#module_test-fs.copyRealModules) ⇒ <code>undefined</code>

<a name="module_test-fs.nodeTree"></a>

### test-fs.nodeTree : <code>Object.&lt;string, (string\|Object\|Array)&gt;</code>
Sample NodeTree for testing circular references and arrays.

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.multiReferenceObject"></a>

### test-fs.multiReferenceObject : <code>Object.&lt;string, (string\|number\|Object)&gt;</code>
Sample of an object containing multiple references.

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.linkedList"></a>

### test-fs.linkedList : <code>Object.&lt;string, (string\|Object)&gt;</code>
Sample LinkedList for testing circular references.

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.jsonDom"></a>

### test-fs.jsonDom : <code>Object.&lt;string, (string\|number\|Array\|Object)&gt;</code>
Sample of jsonDom object containing an empty nested array and objects

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.domItem"></a>

### test-fs.domItem : <code>Object.&lt;string, (string\|number\|Array\|Object)&gt;</code>
Sample of domItem child with nested child and optional details

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.deepReferenceObject"></a>

### test-fs.deepReferenceObject : <code>Object.&lt;string, (string\|number\|Object)&gt;</code>
Sample object with deep references.

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.circularObject"></a>

### test-fs.circularObject : <code>Object.&lt;string, (string\|Object\|Array)&gt;</code>
Multilayered node tree-like structure with parent references

**Kind**: static constant of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.writePackageJson"></a>

### test-fs.writePackageJson(dirPath, fields) ⇒ <code>undefined</code>
Write a package.json file for a directory, creating any missing parent directories first. Parses and
re-serializes with a plain 2-space indent regardless of how `fields` was built, so callers never need to worry
about matching JSON formatting by hand.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | The directory to write the package.json file into. |
| fields | <code>Object.&lt;string, \*&gt;</code> | The package.json fields to write. |

<a name="module_test-fs.writeFixtureFile"></a>

### test-fs.writeFixtureFile(filePath, content) ⇒ <code>undefined</code>
Write a file, creating any missing parent directories first.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The path of the file to write. |
| content | <code>string</code> | The content to write into the file. |

<a name="module_test-fs.afterEach"></a>

### test-fs.afterEach() ⇒ <code>Promise.&lt;\*&gt;</code>
In the Jest.afterEach function call this one to clean up and remove the temp directory.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Resolves once the temp directory (tempDir, see [setDefaults](setDefaults)) has been removed.  
<a name="module_test-fs.exports.afterEach"></a>

### test-fs.exports.afterEach([exists]) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
Ensure that the del has completed, recursively attempt to delete and recreate

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>Promise.&lt;(\*\|void)&gt;</code> - Resolves once the temp directory has been removed and recreated.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [exists] | <code>boolean</code> | <code>true</code> | Whether the temp directory currently exists. Callers normally omit this; it's used internally to recurse until removeDirectory reports the directory is gone, then create it fresh. |

<a name="module_test-fs.exports.createTempDir"></a>

### test-fs.exports.createTempDir() ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
In the Jest.beforeEach function call this one to set up the temp directory.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>Promise.&lt;(\*\|void)&gt;</code> - Resolves once the temp directory (tempDir, see [setDefaults](setDefaults)) has been created.  
<a name="module_test-fs.exports.beforeEach"></a>

### test-fs.exports.beforeEach([dirPath]) ⇒ <code>void</code>
Override the temp directory path used by [afterEach](afterEach), [beforeEach](beforeEach), and [createTempDir](createTempDir). Call
this once, before your tests run, if the default ('test-temp/') doesn't suit your project.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dirPath] | <code>string</code> | <code>null</code> | The directory path to use for temp files instead of the default. Ignored (the existing default stays in effect) if falsy. |

<a name="module_test-fs.removeDirectory"></a>

### test-fs.removeDirectory(dirPath) ⇒ <code>Promise.&lt;\*&gt;</code>
Return a promise to be completed once the specified directory is deleted.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Resolves with dirPath once removed (or immediately, if it didn't exist); rejects with the
removal error otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> | The path of the directory to remove, if it exists. |

<a name="module_test-fs.logObject"></a>

### test-fs.logObject(object, [label], [outputType], [forceOutputType]) ⇒ <code>string</code> \| <code>undefined</code>
Log out an object in a nicely formatted way.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>string</code> \| <code>undefined</code> - The formatted string when outputType is 'string' (or forced to it); otherwise
undefined, since the object is logged directly to the console.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>Object</code> |  | The object (or any value) to log. |
| [label] | <code>string</code> | <code>&quot;logging&quot;</code> | A label printed alongside the object, to identify this log call. |
| [outputType] | <code>string</code> | <code>&quot;log&quot;</code> | Which console method to use ('debug'|'error'|'log'|'warn'), or 'string' to return a formatted string instead of logging. |
| [forceOutputType] | <code>boolean</code> | <code>false</code> | If true, use specified output regardless of environment. |

<a name="module_test-fs.fileExists"></a>

### test-fs.fileExists(filePath) ⇒ <code>boolean</code>
Detect if a file exists and is usable.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>boolean</code> - True if the file exists and is accessible.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The path of the file to check. |

<a name="module_test-fs.countMatches"></a>

### test-fs.countMatches(content, search) ⇒ <code>number</code>
Simple way to count string occurrences for testing.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
**Returns**: <code>number</code> - How many times search occurs in content.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The text to search within. |
| search | <code>string</code> | The substring to count occurrences of. |

<a name="module_test-fs.copyRealModules"></a>

### test-fs.copyRealModules(destModulesDir, moduleNames, [sourceModulesDir]) ⇒ <code>undefined</code>
Copy real, installed node_modules packages into a destination directory, for use as realistic test fixtures
instead of hand-written stand-ins.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| destModulesDir | <code>string</code> |  | The destination node_modules-style directory to copy each package into. |
| moduleNames | <code>Array.&lt;string&gt;</code> |  | The package names to copy. |
| [sourceModulesDir] | <code>string</code> | <code>&quot;&#x27;./node_modules&#x27;&quot;</code> | The source node_modules directory to copy each package from. |


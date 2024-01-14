# test-fs
Set up and tear down a temp directory for running filesystem tests.

There are three options for accessing these functions:
1. CommonJs modules: dist/cjs (default)
2. ES6 modules: dist/mjs
3. Bundles Browser file: browser/test-fs.js

## Usage
To use the temporary directory in tests. Do the following in your tests:
```js
import { setUp } from './setUp'

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
    * [.afterEach()](#module_test-fs.afterEach) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.exports.afterEach([exists])](#module_test-fs.exports.afterEach) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
    * [.exports.createTempDir()](#module_test-fs.exports.createTempDir) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
    * [.removeDirectory(dirPath)](#module_test-fs.removeDirectory) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.logObject(object, [label], [outputType])](#module_test-fs.logObject) ⇒ <code>string</code> \| <code>undefined</code>
    * [.countMatches(content, search)](#module_test-fs.countMatches) ⇒ <code>number</code>

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
<a name="module_test-fs.afterEach"></a>

### test-fs.afterEach() ⇒ <code>Promise.&lt;\*&gt;</code>
In the Jest.afterEach function call this one to clean up and remove the temp directory.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.exports.afterEach"></a>

### test-fs.exports.afterEach([exists]) ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
Ensure that the del has completed, recursively attempt to delete and recreate

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Default |
| --- | --- | --- |
| [exists] | <code>boolean</code> | <code>true</code> | 

<a name="module_test-fs.exports.createTempDir"></a>

### test-fs.exports.createTempDir() ⇒ <code>Promise.&lt;(\*\|void)&gt;</code>
In the Jest.beforeEach function call this one to set up the temp directory.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  
<a name="module_test-fs.removeDirectory"></a>

### test-fs.removeDirectory(dirPath) ⇒ <code>Promise.&lt;\*&gt;</code>
Return a promise to be completed once the specified directory is deleted.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type |
| --- | --- |
| dirPath | <code>string</code> | 

<a name="module_test-fs.logObject"></a>

### test-fs.logObject(object, [label], [outputType]) ⇒ <code>string</code> \| <code>undefined</code>
Log out an object in a nicely formatted way.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type | Default |
| --- | --- | --- |
| object | <code>Object</code> |  | 
| [label] | <code>string</code> | <code>&quot;logging&quot;</code> | 
| [outputType] | <code>string</code> | <code>&quot;log&quot;</code> | 

<a name="module_test-fs.countMatches"></a>

### test-fs.countMatches(content, search) ⇒ <code>number</code>
Simple way to count string occurrences for testing.

**Kind**: static method of [<code>test-fs</code>](#module_test-fs)  

| Param | Type |
| --- | --- |
| content | <code>string</code> | 
| search | <code>string</code> | 


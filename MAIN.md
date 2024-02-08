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


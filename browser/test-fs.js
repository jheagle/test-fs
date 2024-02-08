(function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { var c = typeof require === 'function' && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = 'MODULE_NOT_FOUND', a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var tryToString = require('../internals/try-to-string')

    var $TypeError = TypeError

    // `Assert: IsCallable(argument) is true`
    module.exports = function (argument) {
      if (isCallable(argument)) return argument
      throw new $TypeError(tryToString(argument) + ' is not a function')
    }
  }, { '../internals/is-callable': 46, '../internals/try-to-string': 85 }],
  2: [function (require, module, exports) {
    'use strict'
    var has = require('../internals/weak-map-helpers').has

    // Perform ? RequireInternalSlot(M, [[WeakMapData]])
    module.exports = function (it) {
      has(it)
      return it
    }
  }, { '../internals/weak-map-helpers': 90 }],
  3: [function (require, module, exports) {
    'use strict'
    var isPrototypeOf = require('../internals/object-is-prototype-of')

    var $TypeError = TypeError

    module.exports = function (it, Prototype) {
      if (isPrototypeOf(Prototype, it)) return it
      throw new $TypeError('Incorrect invocation')
    }
  }, { '../internals/object-is-prototype-of': 66 }],
  4: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')

    var $String = String
    var $TypeError = TypeError

    // `Assert: Type(argument) is Object`
    module.exports = function (argument) {
      if (isObject(argument)) return argument
      throw new $TypeError($String(argument) + ' is not an object')
    }
  }, { '../internals/is-object': 49 }],
  5: [function (require, module, exports) {
    'use strict'
    var toIndexedObject = require('../internals/to-indexed-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this)
        var length = lengthOfArrayLike(O)
        var index = toAbsoluteIndex(fromIndex, length)
        var value
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) {
          while (length > index) {
            value = O[index++]
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true
          // Array#indexOf ignores holes, Array#includes - not
          }
        } else {
          for (;length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0
          }
        } return !IS_INCLUDES && -1
      }
    }

    module.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    }
  }, { '../internals/length-of-array-like': 56, '../internals/to-absolute-index': 77, '../internals/to-indexed-object': 78 }],
  6: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var getBuiltIn = require('../internals/get-built-in')
    var getMethod = require('../internals/get-method')

    module.exports = function (iterator, method, argument, reject) {
      try {
        var returnMethod = getMethod(iterator, 'return')
        if (returnMethod) {
          return getBuiltIn('Promise').resolve(call(returnMethod, iterator)).then(function () {
            method(argument)
          }, function (error) {
            reject(error)
          })
        }
      } catch (error2) {
        return reject(error2)
      } method(argument)
    }
  }, { '../internals/function-call': 28, '../internals/get-built-in': 32, '../internals/get-method': 36 }],
  7: [function (require, module, exports) {
    'use strict'
    // https://github.com/tc39/proposal-iterator-helpers
    // https://github.com/tc39/proposal-array-from-async
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var getBuiltIn = require('../internals/get-built-in')
    var getIteratorDirect = require('../internals/get-iterator-direct')
    var closeAsyncIteration = require('../internals/async-iterator-close')

    var createMethod = function (TYPE) {
      var IS_TO_ARRAY = TYPE === 0
      var IS_FOR_EACH = TYPE === 1
      var IS_EVERY = TYPE === 2
      var IS_SOME = TYPE === 3
      return function (object, fn, target) {
        anObject(object)
        var MAPPING = fn !== undefined
        if (MAPPING || !IS_TO_ARRAY) aCallable(fn)
        var record = getIteratorDirect(object)
        var Promise = getBuiltIn('Promise')
        var iterator = record.iterator
        var next = record.next
        var counter = 0

        return new Promise(function (resolve, reject) {
          var ifAbruptCloseAsyncIterator = function (error) {
            closeAsyncIteration(iterator, reject, error, reject)
          }

          var loop = function () {
            try {
              if (MAPPING) {
                try {
                  doesNotExceedSafeInteger(counter)
                } catch (error5) { ifAbruptCloseAsyncIterator(error5) }
              }
              Promise.resolve(anObject(call(next, iterator))).then(function (step) {
                try {
                  if (anObject(step).done) {
                    if (IS_TO_ARRAY) {
                      target.length = counter
                      resolve(target)
                    } else resolve(IS_SOME ? false : IS_EVERY || undefined)
                  } else {
                    var value = step.value
                    try {
                      if (MAPPING) {
                        var result = fn(value, counter)

                        var handler = function ($result) {
                          if (IS_FOR_EACH) {
                            loop()
                          } else if (IS_EVERY) {
                            $result ? loop() : closeAsyncIteration(iterator, resolve, false, reject)
                          } else if (IS_TO_ARRAY) {
                            try {
                              target[counter++] = $result
                              loop()
                            } catch (error4) { ifAbruptCloseAsyncIterator(error4) }
                          } else {
                            $result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop()
                          }
                        }

                        if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator)
                        else handler(result)
                      } else {
                        target[counter++] = value
                        loop()
                      }
                    } catch (error3) { ifAbruptCloseAsyncIterator(error3) }
                  }
                } catch (error2) { reject(error2) }
              }, reject)
            } catch (error) { reject(error) }
          }

          loop()
        })
      }
    }

    module.exports = {
      toArray: createMethod(0),
      forEach: createMethod(1),
      every: createMethod(2),
      some: createMethod(3),
      find: createMethod(4)
    }
  }, { '../internals/a-callable': 1, '../internals/an-object': 4, '../internals/async-iterator-close': 6, '../internals/does-not-exceed-safe-integer': 20, '../internals/function-call': 28, '../internals/get-built-in': 32, '../internals/get-iterator-direct': 33, '../internals/is-object': 49 }],
  8: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    var toString = uncurryThis({}.toString)
    var stringSlice = uncurryThis(''.slice)

    module.exports = function (it) {
      return stringSlice(toString(it), 8, -1)
    }
  }, { '../internals/function-uncurry-this': 31 }],
  9: [function (require, module, exports) {
    'use strict'
    var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support')
    var isCallable = require('../internals/is-callable')
    var classofRaw = require('../internals/classof-raw')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var $Object = Object

    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments }()) === 'Arguments'

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key]
      } catch (error) { /* empty */ }
    }

    // getting tag from ES6+ `Object.prototype.toString`
    module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
      var O, tag, result
      return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
        : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) === 'string' ? tag
        // builtinTag case
          : CORRECT_ARGUMENTS ? classofRaw(O)
          // ES3 arguments fallback
            : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result
    }
  }, { '../internals/classof-raw': 8, '../internals/is-callable': 46, '../internals/to-string-tag-support': 84, '../internals/well-known-symbol': 91 }],
  10: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')
    var ownKeys = require('../internals/own-keys')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var definePropertyModule = require('../internals/object-define-property')

    module.exports = function (target, source, exceptions) {
      var keys = ownKeys(source)
      var defineProperty = definePropertyModule.f
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key))
        }
      }
    }
  }, { '../internals/has-own-property': 38, '../internals/object-define-property': 61, '../internals/object-get-own-property-descriptor': 62, '../internals/own-keys': 71 }],
  11: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = !fails(function () {
      function F () { /* empty */ }
      F.prototype.constructor = null
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype
    })
  }, { '../internals/fails': 25 }],
  12: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var definePropertyModule = require('../internals/object-define-property')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    module.exports = DESCRIPTORS ? function (object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value))
    } : function (object, key, value) {
      object[key] = value
      return object
    }
  }, { '../internals/create-property-descriptor': 13, '../internals/descriptors': 18, '../internals/object-define-property': 61 }],
  13: [function (require, module, exports) {
    'use strict'
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      }
    }
  }, {}],
  14: [function (require, module, exports) {
    'use strict'
    var toPropertyKey = require('../internals/to-property-key')
    var definePropertyModule = require('../internals/object-define-property')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    module.exports = function (object, key, value) {
      var propertyKey = toPropertyKey(key)
      if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value))
      else object[propertyKey] = value
    }
  }, { '../internals/create-property-descriptor': 13, '../internals/object-define-property': 61, '../internals/to-property-key': 83 }],
  15: [function (require, module, exports) {
    'use strict'
    var makeBuiltIn = require('../internals/make-built-in')
    var defineProperty = require('../internals/object-define-property')

    module.exports = function (target, name, descriptor) {
      if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true })
      if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true })
      return defineProperty.f(target, name, descriptor)
    }
  }, { '../internals/make-built-in': 57, '../internals/object-define-property': 61 }],
  16: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var definePropertyModule = require('../internals/object-define-property')
    var makeBuiltIn = require('../internals/make-built-in')
    var defineGlobalProperty = require('../internals/define-global-property')

    module.exports = function (O, key, value, options) {
      if (!options) options = {}
      var simple = options.enumerable
      var name = options.name !== undefined ? options.name : key
      if (isCallable(value)) makeBuiltIn(value, name, options)
      if (options.global) {
        if (simple) O[key] = value
        else defineGlobalProperty(key, value)
      } else {
        try {
          if (!options.unsafe) delete O[key]
          else if (O[key]) simple = true
        } catch (error) { /* empty */ }
        if (simple) O[key] = value
        else {
          definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          })
        }
      } return O
    }
  }, { '../internals/define-global-property': 17, '../internals/is-callable': 46, '../internals/make-built-in': 57, '../internals/object-define-property': 61 }],
  17: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty

    module.exports = function (key, value) {
      try {
        defineProperty(global, key, { value: value, configurable: true, writable: true })
      } catch (error) {
        global[key] = value
      } return value
    }
  }, { '../internals/global': 37 }],
  18: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    // Detect IE8's incomplete defineProperty implementation
    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7 } })[1] !== 7
    })
  }, { '../internals/fails': 25 }],
  19: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var isObject = require('../internals/is-object')

    var document = global.document
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document) && isObject(document.createElement)

    module.exports = function (it) {
      return EXISTS ? document.createElement(it) : {}
    }
  }, { '../internals/global': 37, '../internals/is-object': 49 }],
  20: [function (require, module, exports) {
    'use strict'
    var $TypeError = TypeError
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF // 2 ** 53 - 1 == 9007199254740991

    module.exports = function (it) {
      if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded')
      return it
    }
  }, {}],
  21: [function (require, module, exports) {
    'use strict'
    module.exports = typeof navigator !== 'undefined' && String(navigator.userAgent) || ''
  }, {}],
  22: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var userAgent = require('../internals/engine-user-agent')

    var process = global.process
    var Deno = global.Deno
    var versions = process && process.versions || Deno && Deno.version
    var v8 = versions && versions.v8
    var match, version

    if (v8) {
      match = v8.split('.')
      // in old Chrome, versions of V8 isn't V8 = Chrome / 10
      // but their correct versions are not interesting for us
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])
    }

    // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    // so check `userAgent` even if `.v8` exists, but 0
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/)
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/)
        if (match) version = +match[1]
      }
    }

    module.exports = version
  }, { '../internals/engine-user-agent': 21, '../internals/global': 37 }],
  23: [function (require, module, exports) {
    'use strict'
    // IE8- don't enum bug keys
    module.exports = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ]
  }, {}],
  24: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineGlobalProperty = require('../internals/define-global-property')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')
    var isForced = require('../internals/is-forced')

    /*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
    module.exports = function (options, source) {
      var TARGET = options.target
      var GLOBAL = options.global
      var STATIC = options.stat
      var FORCED, target, key, targetProperty, sourceProperty, descriptor
      if (GLOBAL) {
        target = global
      } else if (STATIC) {
        target = global[TARGET] || defineGlobalProperty(TARGET, {})
      } else {
        target = (global[TARGET] || {}).prototype
      }
      if (target) {
        for (key in source) {
          sourceProperty = source[key]
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key)
            targetProperty = descriptor && descriptor.value
          } else targetProperty = target[key]
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced)
          // contained in target
          if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty === typeof targetProperty) continue
            copyConstructorProperties(sourceProperty, targetProperty)
          }
          // add a flag to not completely full polyfills
          if (options.sham || (targetProperty && targetProperty.sham)) {
            createNonEnumerableProperty(sourceProperty, 'sham', true)
          }
          defineBuiltIn(target, key, sourceProperty, options)
        }
      }
    }
  }, { '../internals/copy-constructor-properties': 10, '../internals/create-non-enumerable-property': 12, '../internals/define-built-in': 16, '../internals/define-global-property': 17, '../internals/global': 37, '../internals/is-forced': 47, '../internals/object-get-own-property-descriptor': 62 }],
  25: [function (require, module, exports) {
    'use strict'
    module.exports = function (exec) {
      try {
        return !!exec()
      } catch (error) {
        return true
      }
    }
  }, {}],
  26: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var aCallable = require('../internals/a-callable')
    var NATIVE_BIND = require('../internals/function-bind-native')

    var bind = uncurryThis(uncurryThis.bind)

    // optional / simple context binding
    module.exports = function (fn, that) {
      aCallable(fn)
      return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
        return fn.apply(that, arguments)
      }
    }
  }, { '../internals/a-callable': 1, '../internals/function-bind-native': 27, '../internals/function-uncurry-this-clause': 30 }],
  27: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-function-prototype-bind -- safe
      var test = function () { /* empty */ }.bind()
      // eslint-disable-next-line no-prototype-builtins -- safe
      return typeof test !== 'function' || test.hasOwnProperty('prototype')
    })
  }, { '../internals/fails': 25 }],
  28: [function (require, module, exports) {
    'use strict'
    var NATIVE_BIND = require('../internals/function-bind-native')

    var call = Function.prototype.call

    module.exports = NATIVE_BIND ? call.bind(call) : function () {
      return call.apply(call, arguments)
    }
  }, { '../internals/function-bind-native': 27 }],
  29: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var hasOwn = require('../internals/has-own-property')

    var FunctionPrototype = Function.prototype
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor

    var EXISTS = hasOwn(FunctionPrototype, 'name')
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && function something () { /* empty */ }.name === 'something'
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable))

    module.exports = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    }
  }, { '../internals/descriptors': 18, '../internals/has-own-property': 38 }],
  30: [function (require, module, exports) {
    'use strict'
    var classofRaw = require('../internals/classof-raw')
    var uncurryThis = require('../internals/function-uncurry-this')

    module.exports = function (fn) {
      // Nashorn bug:
      //   https://github.com/zloirock/core-js/issues/1128
      //   https://github.com/zloirock/core-js/issues/1130
      if (classofRaw(fn) === 'Function') return uncurryThis(fn)
    }
  }, { '../internals/classof-raw': 8, '../internals/function-uncurry-this': 31 }],
  31: [function (require, module, exports) {
    'use strict'
    var NATIVE_BIND = require('../internals/function-bind-native')

    var FunctionPrototype = Function.prototype
    var call = FunctionPrototype.call
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call)

    module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
      return function () {
        return call.apply(fn, arguments)
      }
    }
  }, { '../internals/function-bind-native': 27 }],
  32: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var isCallable = require('../internals/is-callable')

    var aFunction = function (argument) {
      return isCallable(argument) ? argument : undefined
    }

    module.exports = function (namespace, method) {
      return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method]
    }
  }, { '../internals/global': 37, '../internals/is-callable': 46 }],
  33: [function (require, module, exports) {
    'use strict'
    // `GetIteratorDirect(obj)` abstract operation
    // https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
    module.exports = function (obj) {
      return {
        iterator: obj,
        next: obj.next,
        done: false
      }
    }
  }, {}],
  34: [function (require, module, exports) {
    'use strict'
    var classof = require('../internals/classof')
    var getMethod = require('../internals/get-method')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var Iterators = require('../internals/iterators')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var ITERATOR = wellKnownSymbol('iterator')

    module.exports = function (it) {
      if (!isNullOrUndefined(it)) {
        return getMethod(it, ITERATOR) ||
    getMethod(it, '@@iterator') ||
    Iterators[classof(it)]
      }
    }
  }, { '../internals/classof': 9, '../internals/get-method': 36, '../internals/is-null-or-undefined': 48, '../internals/iterators': 55, '../internals/well-known-symbol': 91 }],
  35: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var tryToString = require('../internals/try-to-string')
    var getIteratorMethod = require('../internals/get-iterator-method')

    var $TypeError = TypeError

    module.exports = function (argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator
      if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument))
      throw new $TypeError(tryToString(argument) + ' is not iterable')
    }
  }, { '../internals/a-callable': 1, '../internals/an-object': 4, '../internals/function-call': 28, '../internals/get-iterator-method': 34, '../internals/try-to-string': 85 }],
  36: [function (require, module, exports) {
    'use strict'
    var aCallable = require('../internals/a-callable')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    module.exports = function (V, P) {
      var func = V[P]
      return isNullOrUndefined(func) ? undefined : aCallable(func)
    }
  }, { '../internals/a-callable': 1, '../internals/is-null-or-undefined': 48 }],
  37: [function (require, module, exports) {
    (function (global) {
      (function () {
        'use strict'
        var check = function (it) {
          return it && it.Math === Math && it
        }

        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis === 'object' && globalThis) ||
  check(typeof window === 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self === 'object' && self) ||
  check(typeof global === 'object' && global) ||
  check(typeof this === 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this })() || Function('return this')()
      }).call(this)
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
  }, {}],
  38: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var toObject = require('../internals/to-object')

    var hasOwnProperty = uncurryThis({}.hasOwnProperty)

    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    module.exports = Object.hasOwn || function hasOwn (it, key) {
      return hasOwnProperty(toObject(it), key)
    }
  }, { '../internals/function-uncurry-this': 31, '../internals/to-object': 81 }],
  39: [function (require, module, exports) {
    'use strict'
    module.exports = {}
  }, {}],
  40: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')

    module.exports = getBuiltIn('document', 'documentElement')
  }, { '../internals/get-built-in': 32 }],
  41: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')
    var createElement = require('../internals/document-create-element')

    // Thanks to IE8 for its funny defineProperty
    module.exports = !DESCRIPTORS && !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(createElement('div'), 'a', {
        get: function () { return 7 }
      }).a !== 7
    })
  }, { '../internals/descriptors': 18, '../internals/document-create-element': 19, '../internals/fails': 25 }],
  42: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var classof = require('../internals/classof-raw')

    var $Object = Object
    var split = uncurryThis(''.split)

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    module.exports = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !$Object('z').propertyIsEnumerable(0)
    }) ? function (it) {
        return classof(it) === 'String' ? split(it, '') : $Object(it)
      } : $Object
  }, { '../internals/classof-raw': 8, '../internals/fails': 25, '../internals/function-uncurry-this': 31 }],
  43: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var isCallable = require('../internals/is-callable')
    var store = require('../internals/shared-store')

    var functionToString = uncurryThis(Function.toString)

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function (it) {
        return functionToString(it)
      }
    }

    module.exports = store.inspectSource
  }, { '../internals/function-uncurry-this': 31, '../internals/is-callable': 46, '../internals/shared-store': 74 }],
  44: [function (require, module, exports) {
    'use strict'
    var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection')
    var global = require('../internals/global')
    var isObject = require('../internals/is-object')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var hasOwn = require('../internals/has-own-property')
    var shared = require('../internals/shared-store')
    var sharedKey = require('../internals/shared-key')
    var hiddenKeys = require('../internals/hidden-keys')

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
    var TypeError = global.TypeError
    var WeakMap = global.WeakMap
    var set, get, has

    var enforce = function (it) {
      return has(it) ? get(it) : set(it, {})
    }

    var getterFor = function (TYPE) {
      return function (it) {
        var state
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw new TypeError('Incompatible receiver, ' + TYPE + ' required')
        } return state
      }
    }

    if (NATIVE_WEAK_MAP || shared.state) {
      var store = shared.state || (shared.state = new WeakMap())
      /* eslint-disable no-self-assign -- prototype methods protection */
      store.get = store.get
      store.has = store.has
      store.set = store.set
      /* eslint-enable no-self-assign -- prototype methods protection */
      set = function (it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
        metadata.facade = it
        store.set(it, metadata)
        return metadata
      }
      get = function (it) {
        return store.get(it) || {}
      }
      has = function (it) {
        return store.has(it)
      }
    } else {
      var STATE = sharedKey('state')
      hiddenKeys[STATE] = true
      set = function (it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
        metadata.facade = it
        createNonEnumerableProperty(it, STATE, metadata)
        return metadata
      }
      get = function (it) {
        return hasOwn(it, STATE) ? it[STATE] : {}
      }
      has = function (it) {
        return hasOwn(it, STATE)
      }
    }

    module.exports = {
      set: set,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    }
  }, { '../internals/create-non-enumerable-property': 12, '../internals/global': 37, '../internals/has-own-property': 38, '../internals/hidden-keys': 39, '../internals/is-object': 49, '../internals/shared-key': 73, '../internals/shared-store': 74, '../internals/weak-map-basic-detection': 89 }],
  45: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var Iterators = require('../internals/iterators')

    var ITERATOR = wellKnownSymbol('iterator')
    var ArrayPrototype = Array.prototype

    // check on default Array iterator
    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it)
    }
  }, { '../internals/iterators': 55, '../internals/well-known-symbol': 91 }],
  46: [function (require, module, exports) {
    'use strict'
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    var documentAll = typeof document === 'object' && document.all

    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
    module.exports = typeof documentAll === 'undefined' && documentAll !== undefined ? function (argument) {
      return typeof argument === 'function' || argument === documentAll
    } : function (argument) {
      return typeof argument === 'function'
    }
  }, {}],
  47: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')

    var replacement = /#|\.prototype\./

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)]
      return value === POLYFILL ? true
        : value === NATIVE ? false
          : isCallable(detection) ? fails(detection)
            : !!detection
    }

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase()
    }

    var data = isForced.data = {}
    var NATIVE = isForced.NATIVE = 'N'
    var POLYFILL = isForced.POLYFILL = 'P'

    module.exports = isForced
  }, { '../internals/fails': 25, '../internals/is-callable': 46 }],
  48: [function (require, module, exports) {
    'use strict'
    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    module.exports = function (it) {
      return it === null || it === undefined
    }
  }, {}],
  49: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')

    module.exports = function (it) {
      return typeof it === 'object' ? it !== null : isCallable(it)
    }
  }, { '../internals/is-callable': 46 }],
  50: [function (require, module, exports) {
    'use strict'
    module.exports = false
  }, {}],
  51: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var isCallable = require('../internals/is-callable')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid')

    var $Object = Object

    module.exports = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it === 'symbol'
    } : function (it) {
      var $Symbol = getBuiltIn('Symbol')
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it))
    }
  }, { '../internals/get-built-in': 32, '../internals/is-callable': 46, '../internals/object-is-prototype-of': 66, '../internals/use-symbol-as-uid': 87 }],
  52: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var tryToString = require('../internals/try-to-string')
    var isArrayIteratorMethod = require('../internals/is-array-iterator-method')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var getIterator = require('../internals/get-iterator')
    var getIteratorMethod = require('../internals/get-iterator-method')
    var iteratorClose = require('../internals/iterator-close')

    var $TypeError = TypeError

    var Result = function (stopped, result) {
      this.stopped = stopped
      this.result = result
    }

    var ResultPrototype = Result.prototype

    module.exports = function (iterable, unboundFunction, options) {
      var that = options && options.that
      var AS_ENTRIES = !!(options && options.AS_ENTRIES)
      var IS_RECORD = !!(options && options.IS_RECORD)
      var IS_ITERATOR = !!(options && options.IS_ITERATOR)
      var INTERRUPTED = !!(options && options.INTERRUPTED)
      var fn = bind(unboundFunction, that)
      var iterator, iterFn, index, length, result, next, step

      var stop = function (condition) {
        if (iterator) iteratorClose(iterator, 'normal', condition)
        return new Result(true, condition)
      }

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject(value)
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])
        } return INTERRUPTED ? fn(value, stop) : fn(value)
      }

      if (IS_RECORD) {
        iterator = iterable.iterator
      } else if (IS_ITERATOR) {
        iterator = iterable
      } else {
        iterFn = getIteratorMethod(iterable)
        if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable')
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
            result = callFn(iterable[index])
            if (result && isPrototypeOf(ResultPrototype, result)) return result
          } return new Result(false)
        }
        iterator = getIterator(iterable, iterFn)
      }

      next = IS_RECORD ? iterable.next : iterator.next
      while (!(step = call(next, iterator)).done) {
        try {
          result = callFn(step.value)
        } catch (error) {
          iteratorClose(iterator, 'throw', error)
        }
        if (typeof result === 'object' && result && isPrototypeOf(ResultPrototype, result)) return result
      } return new Result(false)
    }
  }, { '../internals/an-object': 4, '../internals/function-bind-context': 26, '../internals/function-call': 28, '../internals/get-iterator': 35, '../internals/get-iterator-method': 34, '../internals/is-array-iterator-method': 45, '../internals/iterator-close': 53, '../internals/length-of-array-like': 56, '../internals/object-is-prototype-of': 66, '../internals/try-to-string': 85 }],
  53: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var getMethod = require('../internals/get-method')

    module.exports = function (iterator, kind, value) {
      var innerResult, innerError
      anObject(iterator)
      try {
        innerResult = getMethod(iterator, 'return')
        if (!innerResult) {
          if (kind === 'throw') throw value
          return value
        }
        innerResult = call(innerResult, iterator)
      } catch (error) {
        innerError = true
        innerResult = error
      }
      if (kind === 'throw') throw value
      if (innerError) throw innerResult
      anObject(innerResult)
      return value
    }
  }, { '../internals/an-object': 4, '../internals/function-call': 28, '../internals/get-method': 36 }],
  54: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var create = require('../internals/object-create')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var defineBuiltIn = require('../internals/define-built-in')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IS_PURE = require('../internals/is-pure')

    var ITERATOR = wellKnownSymbol('iterator')
    var BUGGY_SAFARI_ITERATORS = false

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator

    /* eslint-disable es/no-array-prototype-keys -- safe */
    if ([].keys) {
      arrayIterator = [].keys()
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator))
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype
      }
    }

    var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
      var test = {}
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test
    })

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {}
    else if (IS_PURE) IteratorPrototype = create(IteratorPrototype)

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!isCallable(IteratorPrototype[ITERATOR])) {
      defineBuiltIn(IteratorPrototype, ITERATOR, function () {
        return this
      })
    }

    module.exports = {
      IteratorPrototype: IteratorPrototype,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    }
  }, { '../internals/define-built-in': 16, '../internals/fails': 25, '../internals/is-callable': 46, '../internals/is-object': 49, '../internals/is-pure': 50, '../internals/object-create': 59, '../internals/object-get-prototype-of': 65, '../internals/well-known-symbol': 91 }],
  55: [function (require, module, exports) {
    arguments[4][39][0].apply(exports, arguments)
  }, { dup: 39 }],
  56: [function (require, module, exports) {
    'use strict'
    var toLength = require('../internals/to-length')

    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    module.exports = function (obj) {
      return toLength(obj.length)
    }
  }, { '../internals/to-length': 80 }],
  57: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var hasOwn = require('../internals/has-own-property')
    var DESCRIPTORS = require('../internals/descriptors')
    var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE
    var inspectSource = require('../internals/inspect-source')
    var InternalStateModule = require('../internals/internal-state')

    var enforceInternalState = InternalStateModule.enforce
    var getInternalState = InternalStateModule.get
    var $String = String
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty
    var stringSlice = uncurryThis(''.slice)
    var replace = uncurryThis(''.replace)
    var join = uncurryThis([].join)

    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
      return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8
    })

    var TEMPLATE = String(String).split('String')

    var makeBuiltIn = module.exports = function (value, name, options) {
      if (stringSlice($String(name), 0, 7) === 'Symbol(') {
        name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']'
      }
      if (options && options.getter) name = 'get ' + name
      if (options && options.setter) name = 'set ' + name
      if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true })
        else value.name = name
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
        defineProperty(value, 'length', { value: options.arity })
      }
      try {
        if (options && hasOwn(options, 'constructor') && options.constructor) {
          if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false })
          // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
        } else if (value.prototype) value.prototype = undefined
      } catch (error) { /* empty */ }
      var state = enforceInternalState(value)
      if (!hasOwn(state, 'source')) {
        state.source = join(TEMPLATE, typeof name === 'string' ? name : '')
      } return value
    }

    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn(function toString () {
      return isCallable(this) && getInternalState(this).source || inspectSource(this)
    }, 'toString')
  }, { '../internals/descriptors': 18, '../internals/fails': 25, '../internals/function-name': 29, '../internals/function-uncurry-this': 31, '../internals/has-own-property': 38, '../internals/inspect-source': 43, '../internals/internal-state': 44, '../internals/is-callable': 46 }],
  58: [function (require, module, exports) {
    'use strict'
    var ceil = Math.ceil
    var floor = Math.floor

    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    // eslint-disable-next-line es/no-math-trunc -- safe
    module.exports = Math.trunc || function trunc (x) {
      var n = +x
      return (n > 0 ? floor : ceil)(n)
    }
  }, {}],
  59: [function (require, module, exports) {
    'use strict'
    /* global ActiveXObject -- old IE, WSH */
    var anObject = require('../internals/an-object')
    var definePropertiesModule = require('../internals/object-define-properties')
    var enumBugKeys = require('../internals/enum-bug-keys')
    var hiddenKeys = require('../internals/hidden-keys')
    var html = require('../internals/html')
    var documentCreateElement = require('../internals/document-create-element')
    var sharedKey = require('../internals/shared-key')

    var GT = '>'
    var LT = '<'
    var PROTOTYPE = 'prototype'
    var SCRIPT = 'script'
    var IE_PROTO = sharedKey('IE_PROTO')

    var EmptyConstructor = function () { /* empty */ }

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT
    }

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''))
      activeXDocument.close()
      var temp = activeXDocument.parentWindow.Object
      activeXDocument = null // avoid memory leak
      return temp
    }

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe')
      var JS = 'java' + SCRIPT + ':'
      var iframeDocument
      iframe.style.display = 'none'
      html.appendChild(iframe)
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS)
      iframeDocument = iframe.contentWindow.document
      iframeDocument.open()
      iframeDocument.write(scriptTag('document.F=Object'))
      iframeDocument.close()
      return iframeDocument.F
    }

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument
    var NullProtoObject = function () {
      try {
        activeXDocument = new ActiveXObject('htmlfile')
      } catch (error) { /* ignore */ }
      NullProtoObject = typeof document !== 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument) // WSH
      var length = enumBugKeys.length
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]
      return NullProtoObject()
    }

    hiddenKeys[IE_PROTO] = true

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    // eslint-disable-next-line es/no-object-create -- safe
    module.exports = Object.create || function create (O, Properties) {
      var result
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O)
        result = new EmptyConstructor()
        EmptyConstructor[PROTOTYPE] = null
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O
      } else result = NullProtoObject()
      return Properties === undefined ? result : definePropertiesModule.f(result, Properties)
    }
  }, { '../internals/an-object': 4, '../internals/document-create-element': 19, '../internals/enum-bug-keys': 23, '../internals/hidden-keys': 39, '../internals/html': 40, '../internals/object-define-properties': 60, '../internals/shared-key': 73 }],
  60: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug')
    var definePropertyModule = require('../internals/object-define-property')
    var anObject = require('../internals/an-object')
    var toIndexedObject = require('../internals/to-indexed-object')
    var objectKeys = require('../internals/object-keys')

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties (O, Properties) {
      anObject(O)
      var props = toIndexedObject(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key
      while (length > index) definePropertyModule.f(O, key = keys[index++], props[key])
      return O
    }
  }, { '../internals/an-object': 4, '../internals/descriptors': 18, '../internals/object-define-property': 61, '../internals/object-keys': 68, '../internals/to-indexed-object': 78, '../internals/v8-prototype-define-bug': 88 }],
  61: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var IE8_DOM_DEFINE = require('../internals/ie8-dom-define')
    var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug')
    var anObject = require('../internals/an-object')
    var toPropertyKey = require('../internals/to-property-key')

    var $TypeError = TypeError
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
    var ENUMERABLE = 'enumerable'
    var CONFIGURABLE = 'configurable'
    var WRITABLE = 'writable'

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty (O, P, Attributes) {
      anObject(O)
      P = toPropertyKey(P)
      anObject(Attributes)
      if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P)
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          }
        }
      } return $defineProperty(O, P, Attributes)
    } : $defineProperty : function defineProperty (O, P, Attributes) {
      anObject(O)
      P = toPropertyKey(P)
      anObject(Attributes)
      if (IE8_DOM_DEFINE) {
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) { /* empty */ }
      }
      if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }
  }, { '../internals/an-object': 4, '../internals/descriptors': 18, '../internals/ie8-dom-define': 41, '../internals/to-property-key': 83, '../internals/v8-prototype-define-bug': 88 }],
  62: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var call = require('../internals/function-call')
    var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toPropertyKey = require('../internals/to-property-key')
    var hasOwn = require('../internals/has-own-property')
    var IE8_DOM_DEFINE = require('../internals/ie8-dom-define')

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor (O, P) {
      O = toIndexedObject(O)
      P = toPropertyKey(P)
      if (IE8_DOM_DEFINE) {
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) { /* empty */ }
      }
      if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P])
    }
  }, { '../internals/create-property-descriptor': 13, '../internals/descriptors': 18, '../internals/function-call': 28, '../internals/has-own-property': 38, '../internals/ie8-dom-define': 41, '../internals/object-property-is-enumerable': 69, '../internals/to-indexed-object': 78, '../internals/to-property-key': 83 }],
  63: [function (require, module, exports) {
    'use strict'
    var internalObjectKeys = require('../internals/object-keys-internal')
    var enumBugKeys = require('../internals/enum-bug-keys')

    var hiddenKeys = enumBugKeys.concat('length', 'prototype')

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames (O) {
      return internalObjectKeys(O, hiddenKeys)
    }
  }, { '../internals/enum-bug-keys': 23, '../internals/object-keys-internal': 67 }],
  64: [function (require, module, exports) {
    'use strict'
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    exports.f = Object.getOwnPropertySymbols
  }, {}],
  65: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')
    var isCallable = require('../internals/is-callable')
    var toObject = require('../internals/to-object')
    var sharedKey = require('../internals/shared-key')
    var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter')

    var IE_PROTO = sharedKey('IE_PROTO')
    var $Object = Object
    var ObjectPrototype = $Object.prototype

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
      var object = toObject(O)
      if (hasOwn(object, IE_PROTO)) return object[IE_PROTO]
      var constructor = object.constructor
      if (isCallable(constructor) && object instanceof constructor) {
        return constructor.prototype
      } return object instanceof $Object ? ObjectPrototype : null
    }
  }, { '../internals/correct-prototype-getter': 11, '../internals/has-own-property': 38, '../internals/is-callable': 46, '../internals/shared-key': 73, '../internals/to-object': 81 }],
  66: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    module.exports = uncurryThis({}.isPrototypeOf)
  }, { '../internals/function-uncurry-this': 31 }],
  67: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var hasOwn = require('../internals/has-own-property')
    var toIndexedObject = require('../internals/to-indexed-object')
    var indexOf = require('../internals/array-includes').indexOf
    var hiddenKeys = require('../internals/hidden-keys')

    var push = uncurryThis([].push)

    module.exports = function (object, names) {
      var O = toIndexedObject(object)
      var i = 0
      var result = []
      var key
      for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key)
      // Don't enum bug & hidden keys
      while (names.length > i) {
        if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key)
        }
      }
      return result
    }
  }, { '../internals/array-includes': 5, '../internals/function-uncurry-this': 31, '../internals/has-own-property': 38, '../internals/hidden-keys': 39, '../internals/to-indexed-object': 78 }],
  68: [function (require, module, exports) {
    'use strict'
    var internalObjectKeys = require('../internals/object-keys-internal')
    var enumBugKeys = require('../internals/enum-bug-keys')

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    module.exports = Object.keys || function keys (O) {
      return internalObjectKeys(O, enumBugKeys)
    }
  }, { '../internals/enum-bug-keys': 23, '../internals/object-keys-internal': 67 }],
  69: [function (require, module, exports) {
    'use strict'
    var $propertyIsEnumerable = {}.propertyIsEnumerable
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1)

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    exports.f = NASHORN_BUG ? function propertyIsEnumerable (V) {
      var descriptor = getOwnPropertyDescriptor(this, V)
      return !!descriptor && descriptor.enumerable
    } : $propertyIsEnumerable
  }, {}],
  70: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')

    var $TypeError = TypeError

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    module.exports = function (input, pref) {
      var fn, val
      if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val
      if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val
      throw new $TypeError("Can't convert object to primitive value")
    }
  }, { '../internals/function-call': 28, '../internals/is-callable': 46, '../internals/is-object': 49 }],
  71: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names')
    var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols')
    var anObject = require('../internals/an-object')

    var concat = uncurryThis([].concat)

    // all object keys, includes non-enumerable and symbols
    module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys (it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it))
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys
    }
  }, { '../internals/an-object': 4, '../internals/function-uncurry-this': 31, '../internals/get-built-in': 32, '../internals/object-get-own-property-names': 63, '../internals/object-get-own-property-symbols': 64 }],
  72: [function (require, module, exports) {
    'use strict'
    var isNullOrUndefined = require('../internals/is-null-or-undefined')

    var $TypeError = TypeError

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    module.exports = function (it) {
      if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it)
      return it
    }
  }, { '../internals/is-null-or-undefined': 48 }],
  73: [function (require, module, exports) {
    'use strict'
    var shared = require('../internals/shared')
    var uid = require('../internals/uid')

    var keys = shared('keys')

    module.exports = function (key) {
      return keys[key] || (keys[key] = uid(key))
    }
  }, { '../internals/shared': 75, '../internals/uid': 86 }],
  74: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var defineGlobalProperty = require('../internals/define-global-property')

    var SHARED = '__core-js_shared__'
    var store = global[SHARED] || defineGlobalProperty(SHARED, {})

    module.exports = store
  }, { '../internals/define-global-property': 17, '../internals/global': 37 }],
  75: [function (require, module, exports) {
    'use strict'
    var IS_PURE = require('../internals/is-pure')
    var store = require('../internals/shared-store');

    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {})
    })('versions', []).push({
      version: '3.35.0',
      mode: IS_PURE ? 'pure' : 'global',
      copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
      license: 'https://github.com/zloirock/core-js/blob/v3.35.0/LICENSE',
      source: 'https://github.com/zloirock/core-js'
    })
  }, { '../internals/is-pure': 50, '../internals/shared-store': 74 }],
  76: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-symbol -- required for testing */
    var V8_VERSION = require('../internals/engine-v8-version')
    var fails = require('../internals/fails')
    var global = require('../internals/global')

    var $String = global.String

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
      var symbol = Symbol('symbol detection')
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
      // of course, fail.
      return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41
    })
  }, { '../internals/engine-v8-version': 22, '../internals/fails': 25, '../internals/global': 37 }],
  77: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var max = Math.max
    var min = Math.min

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    module.exports = function (index, length) {
      var integer = toIntegerOrInfinity(index)
      return integer < 0 ? max(integer + length, 0) : min(integer, length)
    }
  }, { '../internals/to-integer-or-infinity': 79 }],
  78: [function (require, module, exports) {
    'use strict'
    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject = require('../internals/indexed-object')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    module.exports = function (it) {
      return IndexedObject(requireObjectCoercible(it))
    }
  }, { '../internals/indexed-object': 42, '../internals/require-object-coercible': 72 }],
  79: [function (require, module, exports) {
    'use strict'
    var trunc = require('../internals/math-trunc')

    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    module.exports = function (argument) {
      var number = +argument
      // eslint-disable-next-line no-self-compare -- NaN check
      return number !== number || number === 0 ? 0 : trunc(number)
    }
  }, { '../internals/math-trunc': 58 }],
  80: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var min = Math.min

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    module.exports = function (argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0 // 2 ** 53 - 1 == 9007199254740991
    }
  }, { '../internals/to-integer-or-infinity': 79 }],
  81: [function (require, module, exports) {
    'use strict'
    var requireObjectCoercible = require('../internals/require-object-coercible')

    var $Object = Object

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    module.exports = function (argument) {
      return $Object(requireObjectCoercible(argument))
    }
  }, { '../internals/require-object-coercible': 72 }],
  82: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var isObject = require('../internals/is-object')
    var isSymbol = require('../internals/is-symbol')
    var getMethod = require('../internals/get-method')
    var ordinaryToPrimitive = require('../internals/ordinary-to-primitive')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var $TypeError = TypeError
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    module.exports = function (input, pref) {
      if (!isObject(input) || isSymbol(input)) return input
      var exoticToPrim = getMethod(input, TO_PRIMITIVE)
      var result
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default'
        result = call(exoticToPrim, input, pref)
        if (!isObject(result) || isSymbol(result)) return result
        throw new $TypeError("Can't convert object to primitive value")
      }
      if (pref === undefined) pref = 'number'
      return ordinaryToPrimitive(input, pref)
    }
  }, { '../internals/function-call': 28, '../internals/get-method': 36, '../internals/is-object': 49, '../internals/is-symbol': 51, '../internals/ordinary-to-primitive': 70, '../internals/well-known-symbol': 91 }],
  83: [function (require, module, exports) {
    'use strict'
    var toPrimitive = require('../internals/to-primitive')
    var isSymbol = require('../internals/is-symbol')

    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    module.exports = function (argument) {
      var key = toPrimitive(argument, 'string')
      return isSymbol(key) ? key : key + ''
    }
  }, { '../internals/is-symbol': 51, '../internals/to-primitive': 82 }],
  84: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var test = {}

    test[TO_STRING_TAG] = 'z'

    module.exports = String(test) === '[object z]'
  }, { '../internals/well-known-symbol': 91 }],
  85: [function (require, module, exports) {
    'use strict'
    var $String = String

    module.exports = function (argument) {
      try {
        return $String(argument)
      } catch (error) {
        return 'Object'
      }
    }
  }, {}],
  86: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    var id = 0
    var postfix = Math.random()
    var toString = uncurryThis(1.0.toString)

    module.exports = function (key) {
      return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36)
    }
  }, { '../internals/function-uncurry-this': 31 }],
  87: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-symbol -- required for testing */
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')

    module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator === 'symbol'
  }, { '../internals/symbol-constructor-detection': 76 }],
  88: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')

    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    module.exports = DESCRIPTORS && fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(function () { /* empty */ }, 'prototype', {
        value: 42,
        writable: false
      }).prototype !== 42
    })
  }, { '../internals/descriptors': 18, '../internals/fails': 25 }],
  89: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var isCallable = require('../internals/is-callable')

    var WeakMap = global.WeakMap

    module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap))
  }, { '../internals/global': 37, '../internals/is-callable': 46 }],
  90: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    // eslint-disable-next-line es/no-weak-map -- safe
    var WeakMapPrototype = WeakMap.prototype

    module.exports = {
      // eslint-disable-next-line es/no-weak-map -- safe
      WeakMap: WeakMap,
      set: uncurryThis(WeakMapPrototype.set),
      get: uncurryThis(WeakMapPrototype.get),
      has: uncurryThis(WeakMapPrototype.has),
      remove: uncurryThis(WeakMapPrototype.delete)
    }
  }, { '../internals/function-uncurry-this': 31 }],
  91: [function (require, module, exports) {
    'use strict'
    var global = require('../internals/global')
    var shared = require('../internals/shared')
    var hasOwn = require('../internals/has-own-property')
    var uid = require('../internals/uid')
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')
    var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid')

    var Symbol = global.Symbol
    var WellKnownSymbolsStore = shared('wks')
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol.for || Symbol : Symbol && Symbol.withoutSetter || uid

    module.exports = function (name) {
      if (!hasOwn(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
          ? Symbol[name]
          : createWellKnownSymbol('Symbol.' + name)
      } return WellKnownSymbolsStore[name]
    }
  }, { '../internals/global': 37, '../internals/has-own-property': 38, '../internals/shared': 75, '../internals/symbol-constructor-detection': 76, '../internals/uid': 86, '../internals/use-symbol-as-uid': 87 }],
  92: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $forEach = require('../internals/async-iterator-iteration').forEach

    // `AsyncIterator.prototype.forEach` method
    // https://github.com/tc39/proposal-async-iterator-helpers
    $({ target: 'AsyncIterator', proto: true, real: true }, {
      forEach: function forEach (fn) {
        return $forEach(this, fn)
      }
    })
  }, { '../internals/async-iterator-iteration': 7, '../internals/export': 24 }],
  93: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var global = require('../internals/global')
    var anInstance = require('../internals/an-instance')
    var anObject = require('../internals/an-object')
    var isCallable = require('../internals/is-callable')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var createProperty = require('../internals/create-property')
    var fails = require('../internals/fails')
    var hasOwn = require('../internals/has-own-property')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    var CONSTRUCTOR = 'constructor'
    var ITERATOR = 'Iterator'
    var TO_STRING_TAG = wellKnownSymbol('toStringTag')

    var $TypeError = TypeError
    var NativeIterator = global[ITERATOR]

    // FF56- have non-standard global helper `Iterator`
    var FORCED = IS_PURE ||
  !isCallable(NativeIterator) ||
  NativeIterator.prototype !== IteratorPrototype ||
  // FF44- non-standard `Iterator` passes previous tests
  !fails(function () { NativeIterator({}) })

    var IteratorConstructor = function Iterator () {
      anInstance(this, IteratorPrototype)
      if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable')
    }

    var defineIteratorPrototypeAccessor = function (key, value) {
      if (DESCRIPTORS) {
        defineBuiltInAccessor(IteratorPrototype, key, {
          configurable: true,
          get: function () {
            return value
          },
          set: function (replacement) {
            anObject(this)
            if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property")
            if (hasOwn(this, key)) this[key] = replacement
            else createProperty(this, key, replacement)
          }
        })
      } else IteratorPrototype[key] = value
    }

    if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR)

    if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
      defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor)
    }

    IteratorConstructor.prototype = IteratorPrototype

    // `Iterator` constructor
    // https://github.com/tc39/proposal-iterator-helpers
    $({ global: true, constructor: true, forced: FORCED }, {
      Iterator: IteratorConstructor
    })
  }, { '../internals/an-instance': 3, '../internals/an-object': 4, '../internals/create-property': 14, '../internals/define-built-in-accessor': 15, '../internals/descriptors': 18, '../internals/export': 24, '../internals/fails': 25, '../internals/global': 37, '../internals/has-own-property': 38, '../internals/is-callable': 46, '../internals/is-pure': 50, '../internals/iterators-core': 54, '../internals/object-get-prototype-of': 65, '../internals/well-known-symbol': 91 }],
  94: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var iterate = require('../internals/iterate')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var getIteratorDirect = require('../internals/get-iterator-direct')

    // `Iterator.prototype.forEach` method
    // https://github.com/tc39/proposal-iterator-helpers
    $({ target: 'Iterator', proto: true, real: true }, {
      forEach: function forEach (fn) {
        anObject(this)
        aCallable(fn)
        var record = getIteratorDirect(this)
        var counter = 0
        iterate(record, function (value) {
          fn(value, counter++)
        }, { IS_RECORD: true })
      }
    })
  }, { '../internals/a-callable': 1, '../internals/an-object': 4, '../internals/export': 24, '../internals/get-iterator-direct': 33, '../internals/iterate': 52 }],
  95: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var aWeakMap = require('../internals/a-weak-map')
    var remove = require('../internals/weak-map-helpers').remove

    // `WeakMap.prototype.deleteAll` method
    // https://github.com/tc39/proposal-collection-methods
    $({ target: 'WeakMap', proto: true, real: true, forced: true }, {
      deleteAll: function deleteAll (/* ...elements */) {
        var collection = aWeakMap(this)
        var allDeleted = true
        var wasDeleted
        for (var k = 0, len = arguments.length; k < len; k++) {
          wasDeleted = remove(collection, arguments[k])
          allDeleted = allDeleted && wasDeleted
        } return !!allDeleted
      }
    })
  }, { '../internals/a-weak-map': 2, '../internals/export': 24, '../internals/weak-map-helpers': 90 }],
  96: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.default = exports.circularObject = void 0
    /**
 * Multilayered node tree-like structure with parent references
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
    const circularObject = exports.circularObject = {
      name: 'root',
      parent: null,
      body: null,
      head: null,
      children: []
    }
    circularObject.children = [{
      name: 'body',
      parent: null,
      children: []
    }, {
      name: 'head',
      parent: null,
      children: []
    }]
    circularObject.body = circularObject.children[0]
    circularObject.head = circularObject.children[1]
    circularObject.body.parent = circularObject
    circularObject.head.parent = circularObject
    circularObject.body.children = [{
      name: 'body child one',
      parent: null,
      children: []
    }, {
      name: 'body child two',
      parent: null,
      children: []
    }]
    circularObject.body.children[0].parent = circularObject.body
    circularObject.body.children[1].parent = circularObject.body
    circularObject.head.children = [{
      name: 'head child one',
      parent: null,
      children: []
    }, {
      name: 'head child two',
      parent: null,
      children: []
    }]
    circularObject.head.children[0].parent = circularObject.head
    circularObject.head.children[1].parent = circularObject.head
    var _default = exports.default = circularObject
  }, {}],
  97: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.default = exports.countMatches = void 0
    /**
 * Simple way to count string occurrences for testing.
 * @function
 * @memberOf module:test-fs
 * @param {string} content
 * @param {string} search
 * @returns {number}
 */
    const countMatches = (content, search) => content.split(search).length - 1
    exports.countMatches = countMatches
    var _default = exports.default = countMatches
  }, {}],
  98: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.default = exports.deepReferenceObject = void 0
    /**
 * Sample object with deep references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Object>}
 */
    const deepReferenceObject = exports.deepReferenceObject = {
      object1: {
        name: 'someName',
        object2: {
          age: 12,
          array1: ['someString', 'anotherString']
        },
        array2: [89, 32]
      },
      title: 'Some Title',
      item: 45
    }
    var _default = exports.default = deepReferenceObject
  }, {}],
  99: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.domItem = exports.default = void 0
    /**
 * Sample of domItem child with nested child and optional details
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Array|Object>}
 */
    const domItem = exports.domItem = [{
      attributes: {
        className: 'row',
        style: {}
      },
      axis: 'y',
      children: [{
        attributes: {
          style: {}
        },
        axis: 'x',
        children: [],
        element: {},
        eventListeners: {},
        hasShip: false,
        isHit: false,
        parentItem: {},
        point: {},
        tagName: 'div'
      }],
      element: null,
      eventListeners: {},
      parentItem: {},
      tagName: 'div'
    }]
    var _default = exports.default = domItem
  }, {}],
  100: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.jsonDom = exports.default = void 0
    /**
 * Sample of jsonDom object containing an empty nested array and objects
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Array|Object>}
 */
    const jsonDom = exports.jsonDom = {
      tagName: 'div',
      attributes: {
        style: {},
        className: 'column'
      },
      element: null,
      eventListeners: {},
      parentItem: {},
      children: [],
      axis: 'x'
    }
    var _default = exports.default = jsonDom
  }, {}],
  101: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.linkedList = exports.default = void 0
    /**
 * Sample LinkedList for testing circular references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object>}
 */
    const linkedList = exports.linkedList = {
      name: 'one',
      prev: null,
      next: null
    }
    linkedList.next = {
      name: 'two',
      prev: linkedList,
      next: null
    }
    linkedList.next.next = {
      name: 'three',
      prev: linkedList.next,
      next: null
    }
    var _default = exports.default = linkedList
  }, {}],
  102: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.logObject = exports.default = void 0
    /**
 * Log out an object in a nicely formatted way.
 * @function
 * @memberOf module:test-fs
 * @param {Object} object
 * @param {string} [label=logging]
 * @param {string} [outputType=log]
 * @returns {string|undefined}
 */
    const logObject = (object, label = 'logging', outputType = 'log') => {
      const logger = outputType === 'string' ? (label, object) => `'${label}' | ` + JSON.stringify(object) : console[outputType]
      if (typeof require === 'undefined' || outputType === 'string') {
        return logger(label, object)
      }
      return logger(label, require('util').inspect(object, false, null, true))
    }
    exports.logObject = logObject
    var _default = exports.default = logObject
  }, { util: 140 }],
  103: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.multiReferenceObject = exports.default = void 0
    /**
 * Sample of an object containing multiple references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Object>}
 */
    const multiReferenceObject = exports.multiReferenceObject = {
      object1: {
        name: 'someName'
      },
      object2: {
        age: 12
      },
      array1: ['someString', 'anotherString'],
      array2: [89, 32],
      title: 'Some Title',
      item: 45
    }
    var _default = exports.default = multiReferenceObject
  }, {}],
  104: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.nodeTree = exports.default = void 0
    /**
 * Sample NodeTree for testing circular references and arrays.
 * @memberOf module:test-fs
 * @type {Object.<string, string|Object|Array>}
 */
    const nodeTree = exports.nodeTree = {
      name: 'one',
      parent: null,
      children: []
    }
    nodeTree.children[0] = {
      name: 'child one',
      parent: nodeTree,
      children: []
    }
    nodeTree.children[1] = {
      name: 'child two',
      parent: nodeTree,
      children: []
    }
    nodeTree.children[0].children[0] = {
      name: 'grandchild one',
      parent: nodeTree.children[0],
      children: []
    }
    var _default = exports.default = nodeTree
  }, {}],
  105: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.removeDirectory = exports.default = void 0
    var _fs = require('fs')
    /**
 * Return a promise to be completed once the specified directory is deleted.
 * @function
 * @memberOf module:test-fs
 * @param {string} dirPath
 * @returns {Promise<*>}
 */
    const removeDirectory = dirPath => new Promise((resolve, reject) => (0, _fs.access)(dirPath, _fs.constants.F_OK, removed => removed ? resolve(dirPath) : (0, _fs.rm)(dirPath, {
      recursive: true
    }, error => error ? reject(error) : resolve(dirPath))))
    exports.removeDirectory = removeDirectory
    var _default = exports.default = removeDirectory
  }, { fs: 109 }],
  106: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.setUp = exports.setDefaults = exports.default = exports.createTempDir = exports.beforeEach = exports.afterEach = void 0
    var _fs = require('fs')
    var _removeDirectory = _interopRequireDefault(require('./removeDirectory'))
    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
    var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt (value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value)
        })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled (value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected (value) {
          try {
            step(generator.throw(value))
          } catch (e) {
            reject(e)
          }
        }
        function step (result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }

    // Import the configurations and override some of them to direct to the temp directory.

    let tempDir = 'test-temp/'
    let srcPath = `${tempDir}src`
    /**
 * In the Jest.afterEach function call this one to clean up and remove the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*>}
 */
    const afterEach = () => (0, _removeDirectory.default)(tempDir)
    /**
 * Ensure that the del has completed, recursively attempt to delete and recreate
 * @function
 * @memberOf module:test-fs
 * @param {boolean} [exists=true]
 * @returns {Promise<*|void>}
 */
    exports.afterEach = afterEach
    const createTempDir = (exists = true) => __awaiter(void 0, void 0, void 0, function * () {
      if (exists) {
        return (0, _removeDirectory.default)(tempDir).then(removedDir => createTempDir((0, _fs.existsSync)(removedDir))).catch(error => console.error('Error: ', error))
      }
      return (0, _fs.mkdirSync)(srcPath, {
        recursive: true
      })
    })
    /**
 * In the Jest.beforeEach function call this one to set up the temp directory.
 * @function
 * @memberOf module:test-fs
 * @returns {Promise<*|void>}
 */
    exports.createTempDir = createTempDir
    const beforeEach = () => createTempDir()
    exports.beforeEach = beforeEach
    const setDefaults = (dirPath = null) => {
      if (dirPath) {
        tempDir = dirPath
        srcPath = `${tempDir}src`
      }
    }
    exports.setDefaults = setDefaults
    const setUp = exports.setUp = {
      afterEach,
      beforeEach,
      createTempDir,
      setDefaults
    }
    var _default = exports.default = setUp
  }, { './removeDirectory': 105, fs: 109 }],
  107: [function (require, module, exports) {
    'use strict'

    require('core-js/modules/esnext.weak-map.delete-all.js')
    require('core-js/modules/esnext.async-iterator.for-each.js')
    require('core-js/modules/esnext.iterator.constructor.js')
    require('core-js/modules/esnext.iterator.for-each.js')
    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    var _exportNames = {
      testFs: true,
      testFsBrowser: true
    }
    exports.testFsBrowser = exports.testFs = exports.default = void 0
    var _circularObject = _interopRequireWildcard(require('./functions/circularObject'))
    Object.keys(_circularObject).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _circularObject[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _circularObject[key]
        }
      })
    })
    var _countMatches = _interopRequireWildcard(require('./functions/countMatches'))
    Object.keys(_countMatches).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _countMatches[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _countMatches[key]
        }
      })
    })
    var _deepReferenceObject = _interopRequireWildcard(require('./functions/deepReferenceObject'))
    Object.keys(_deepReferenceObject).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _deepReferenceObject[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _deepReferenceObject[key]
        }
      })
    })
    var _domItem = _interopRequireWildcard(require('./functions/domItem'))
    Object.keys(_domItem).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _domItem[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _domItem[key]
        }
      })
    })
    var _jsonDom = _interopRequireWildcard(require('./functions/jsonDom'))
    Object.keys(_jsonDom).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _jsonDom[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _jsonDom[key]
        }
      })
    })
    var _linkedList = _interopRequireWildcard(require('./functions/linkedList'))
    Object.keys(_linkedList).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _linkedList[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _linkedList[key]
        }
      })
    })
    var _logObject = _interopRequireWildcard(require('./functions/logObject'))
    Object.keys(_logObject).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _logObject[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _logObject[key]
        }
      })
    })
    var _multiReferenceObject = _interopRequireWildcard(require('./functions/multiReferenceObject'))
    Object.keys(_multiReferenceObject).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _multiReferenceObject[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _multiReferenceObject[key]
        }
      })
    })
    var _nodeTree = _interopRequireWildcard(require('./functions/nodeTree'))
    Object.keys(_nodeTree).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _nodeTree[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _nodeTree[key]
        }
      })
    })
    var _removeDirectory = _interopRequireWildcard(require('./functions/removeDirectory'))
    Object.keys(_removeDirectory).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _removeDirectory[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _removeDirectory[key]
        }
      })
    })
    var _setUp = _interopRequireWildcard(require('./functions/setUp'))
    Object.keys(_setUp).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
      if (key in exports && exports[key] === _setUp[key]) return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _setUp[key]
        }
      })
    })
    function _getRequireWildcardCache (e) { if (typeof WeakMap !== 'function') return null; var r = new WeakMap(); var t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r })(e) }
    function _interopRequireWildcard (e, r) { if (!r && e && e.__esModule) return e; if (e === null || typeof e !== 'object' && typeof e !== 'function') return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }; var a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if (u !== 'default' && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u] } return n.default = e, t && t.set(e, n), n }
    /**
 * An assortment of objects that can be used in tests and some functions to help debug and write tests.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module test-fs
 */

    const testFs = exports.testFs = {
      circularObject: _circularObject.default,
      countMatches: _countMatches.default,
      deepReferenceObject: _deepReferenceObject.default,
      domItem: _domItem.default,
      jsonDom: _jsonDom.default,
      linkedList: _linkedList.default,
      logObject: _logObject.default,
      multiReferenceObject: _multiReferenceObject.default,
      nodeTree: _nodeTree.default,
      removeDirectory: _removeDirectory.default,
      setUp: _setUp.default
    }
    var _default = exports.default = testFs
    const testFsBrowser = exports.testFsBrowser = {
      circularObject: _circularObject.default,
      countMatches: _countMatches.default,
      deepReferenceObject: _deepReferenceObject.default,
      domItem: _domItem.default,
      jsonDom: _jsonDom.default,
      linkedList: _linkedList.default,
      logObject: _logObject.default,
      multiReferenceObject: _multiReferenceObject.default,
      nodeTree: _nodeTree.default
    }
    if (void 0) {
      // @ts-ignore
      (void 0).testFs = testFsBrowser
    } else if (typeof window !== 'undefined') {
      // @ts-ignore
      window.testFs = testFsBrowser
    }
  }, { './functions/circularObject': 96, './functions/countMatches': 97, './functions/deepReferenceObject': 98, './functions/domItem': 99, './functions/jsonDom': 100, './functions/linkedList': 101, './functions/logObject': 102, './functions/multiReferenceObject': 103, './functions/nodeTree': 104, './functions/removeDirectory': 105, './functions/setUp': 106, 'core-js/modules/esnext.async-iterator.for-each.js': 92, 'core-js/modules/esnext.iterator.constructor.js': 93, 'core-js/modules/esnext.iterator.for-each.js': 94, 'core-js/modules/esnext.weak-map.delete-all.js': 95 }],
  108: [function (require, module, exports) {
    (function (global) {
      (function () {
        'use strict'

        var /** @type {ReturnType<import('.')>} */ possibleNames = [
          'BigInt64Array',
          'BigUint64Array',
          'Float32Array',
          'Float64Array',
          'Int16Array',
          'Int32Array',
          'Int8Array',
          'Uint16Array',
          'Uint32Array',
          'Uint8Array',
          'Uint8ClampedArray'
        ]

        var g = typeof globalThis === 'undefined' ? global : globalThis

        /** @type {import('.')} */
        module.exports = function availableTypedArrays () {
          var /** @type {ReturnType<typeof availableTypedArrays>} */ out = []
          for (var i = 0; i < possibleNames.length; i++) {
            if (typeof g[possibleNames[i]] === 'function') {
              // @ts-expect-error
              out[out.length] = possibleNames[i]
            }
          }
          return out
        }
      }).call(this)
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
  }, {}],
  109: [function (require, module, exports) {

  }, {}],
  110: [function (require, module, exports) {
    'use strict'

    var GetIntrinsic = require('get-intrinsic')

    var callBind = require('./')

    var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'))

    module.exports = function callBoundIntrinsic (name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing)
      if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
        return callBind(intrinsic)
      }
      return intrinsic
    }
  }, { './': 111, 'get-intrinsic': 123 }],
  111: [function (require, module, exports) {
    'use strict'

    var bind = require('function-bind')
    var GetIntrinsic = require('get-intrinsic')
    var setFunctionLength = require('set-function-length')

    var $TypeError = require('es-errors/type')
    var $apply = GetIntrinsic('%Function.prototype.apply%')
    var $call = GetIntrinsic('%Function.prototype.call%')
    var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply)

    var $defineProperty = GetIntrinsic('%Object.defineProperty%', true)
    var $max = GetIntrinsic('%Math.max%')

    if ($defineProperty) {
      try {
        $defineProperty({}, 'a', { value: 1 })
      } catch (e) {
      // IE 8 has a broken defineProperty
        $defineProperty = null
      }
    }

    module.exports = function callBind (originalFunction) {
      if (typeof originalFunction !== 'function') {
        throw new $TypeError('a function is required')
      }
      var func = $reflectApply(bind, $call, arguments)
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      )
    }

    var applyBind = function applyBind () {
      return $reflectApply(bind, $apply, arguments)
    }

    if ($defineProperty) {
      $defineProperty(module.exports, 'apply', { value: applyBind })
    } else {
      module.exports.apply = applyBind
    }
  }, { 'es-errors/type': 118, 'function-bind': 122, 'get-intrinsic': 123, 'set-function-length': 137 }],
  112: [function (require, module, exports) {
    'use strict'

    var hasPropertyDescriptors = require('has-property-descriptors')()

    var GetIntrinsic = require('get-intrinsic')

    var $defineProperty = hasPropertyDescriptors && GetIntrinsic('%Object.defineProperty%', true)
    if ($defineProperty) {
      try {
        $defineProperty({}, 'a', { value: 1 })
      } catch (e) {
      // IE 8 has a broken defineProperty
        $defineProperty = false
      }
    }

    var $SyntaxError = require('es-errors/syntax')
    var $TypeError = require('es-errors/type')

    var gopd = require('gopd')

    /** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */
    module.exports = function defineDataProperty (
      obj,
      property,
      value
    ) {
      if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
        throw new $TypeError('`obj` must be an object or a function`')
      }
      if (typeof property !== 'string' && typeof property !== 'symbol') {
        throw new $TypeError('`property` must be a string or a symbol`')
      }
      if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
        throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null')
      }
      if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
        throw new $TypeError('`nonWritable`, if provided, must be a boolean or null')
      }
      if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
        throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null')
      }
      if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
        throw new $TypeError('`loose`, if provided, must be a boolean')
      }

      var nonEnumerable = arguments.length > 3 ? arguments[3] : null
      var nonWritable = arguments.length > 4 ? arguments[4] : null
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null
      var loose = arguments.length > 6 ? arguments[6] : false

      /* @type {false | TypedPropertyDescriptor<unknown>} */
      var desc = !!gopd && gopd(obj, property)

      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value: value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        })
      } else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
      // must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
        obj[property] = value // eslint-disable-line no-param-reassign
      } else {
        throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.')
      }
    }
  }, { 'es-errors/syntax': 117, 'es-errors/type': 118, 'get-intrinsic': 123, gopd: 124, 'has-property-descriptors': 125 }],
  113: [function (require, module, exports) {
    'use strict'

    /** @type {import('./eval')} */
    module.exports = EvalError
  }, {}],
  114: [function (require, module, exports) {
    'use strict'

    /** @type {import('.')} */
    module.exports = Error
  }, {}],
  115: [function (require, module, exports) {
    'use strict'

    /** @type {import('./range')} */
    module.exports = RangeError
  }, {}],
  116: [function (require, module, exports) {
    'use strict'

    /** @type {import('./ref')} */
    module.exports = ReferenceError
  }, {}],
  117: [function (require, module, exports) {
    'use strict'

    /** @type {import('./syntax')} */
    module.exports = SyntaxError
  }, {}],
  118: [function (require, module, exports) {
    'use strict'

    /** @type {import('./type')} */
    module.exports = TypeError
  }, {}],
  119: [function (require, module, exports) {
    'use strict'

    /** @type {import('./uri')} */
    module.exports = URIError
  }, {}],
  120: [function (require, module, exports) {
    'use strict'

    var isCallable = require('is-callable')

    var toStr = Object.prototype.toString
    var hasOwnProperty = Object.prototype.hasOwnProperty

    var forEachArray = function forEachArray (array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array)
          } else {
            iterator.call(receiver, array[i], i, array)
          }
        }
      }
    }

    var forEachString = function forEachString (string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
      // no such thing as a sparse string.
        if (receiver == null) {
          iterator(string.charAt(i), i, string)
        } else {
          iterator.call(receiver, string.charAt(i), i, string)
        }
      }
    }

    var forEachObject = function forEachObject (object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object)
          } else {
            iterator.call(receiver, object[k], k, object)
          }
        }
      }
    }

    var forEach = function forEach (list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function')
      }

      var receiver
      if (arguments.length >= 3) {
        receiver = thisArg
      }

      if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver)
      } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver)
      } else {
        forEachObject(list, iterator, receiver)
      }
    }

    module.exports = forEach
  }, { 'is-callable': 133 }],
  121: [function (require, module, exports) {
    'use strict'

    /* eslint no-invalid-this: 1 */

    var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible '
    var toStr = Object.prototype.toString
    var max = Math.max
    var funcType = '[object Function]'

    var concatty = function concatty (a, b) {
      var arr = []

      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i]
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j]
      }

      return arr
    }

    var slicy = function slicy (arrLike, offset) {
      var arr = []
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i]
      }
      return arr
    }

    var joiny = function (arr, joiner) {
      var str = ''
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i]
        if (i + 1 < arr.length) {
          str += joiner
        }
      }
      return str
    }

    module.exports = function bind (that) {
      var target = this
      if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target)
      }
      var args = slicy(arguments, 1)

      var bound
      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          )
          if (Object(result) === result) {
            return result
          }
          return this
        }
        return target.apply(
          that,
          concatty(args, arguments)
        )
      }

      var boundLength = max(0, target.length - args.length)
      var boundArgs = []
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i
      }

      bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder)

      if (target.prototype) {
        var Empty = function Empty () {}
        Empty.prototype = target.prototype
        bound.prototype = new Empty()
        Empty.prototype = null
      }

      return bound
    }
  }, {}],
  122: [function (require, module, exports) {
    'use strict'

    var implementation = require('./implementation')

    module.exports = Function.prototype.bind || implementation
  }, { './implementation': 121 }],
  123: [function (require, module, exports) {
    'use strict'

    var undefined

    var $Error = require('es-errors')
    var $EvalError = require('es-errors/eval')
    var $RangeError = require('es-errors/range')
    var $ReferenceError = require('es-errors/ref')
    var $SyntaxError = require('es-errors/syntax')
    var $TypeError = require('es-errors/type')
    var $URIError = require('es-errors/uri')

    var $Function = Function

    // eslint-disable-next-line consistent-return
    var getEvalledConstructor = function (expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')()
      } catch (e) {}
    }

    var $gOPD = Object.getOwnPropertyDescriptor
    if ($gOPD) {
      try {
        $gOPD({}, '')
      } catch (e) {
        $gOPD = null // this is IE 8, which has a broken gOPD
      }
    }

    var throwTypeError = function () {
      throw new $TypeError()
    }
    var ThrowTypeError = $gOPD
      ? (function () {
        try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
          arguments.callee // IE 8 does not throw here
          return throwTypeError
        } catch (calleeThrows) {
          try {
          // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get
          } catch (gOPDthrows) {
            return throwTypeError
          }
        }
      }())
      : throwTypeError

    var hasSymbols = require('has-symbols')()
    var hasProto = require('has-proto')()

    var getProto = Object.getPrototypeOf || (
      hasProto
        ? function (x) { return x.__proto__ } // eslint-disable-line no-proto
        : null
    )

    var needsEval = {}

    var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array)

    var INTRINSICS = {
      __proto__: null,
      '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
      '%Array%': Array,
      '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
      '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
      '%AsyncFromSyncIteratorPrototype%': undefined,
      '%AsyncFunction%': needsEval,
      '%AsyncGenerator%': needsEval,
      '%AsyncGeneratorFunction%': needsEval,
      '%AsyncIteratorPrototype%': needsEval,
      '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
      '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
      '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
      '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
      '%Boolean%': Boolean,
      '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
      '%Date%': Date,
      '%decodeURI%': decodeURI,
      '%decodeURIComponent%': decodeURIComponent,
      '%encodeURI%': encodeURI,
      '%encodeURIComponent%': encodeURIComponent,
      '%Error%': $Error,
      '%eval%': eval, // eslint-disable-line no-eval
      '%EvalError%': $EvalError,
      '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
      '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
      '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
      '%Function%': $Function,
      '%GeneratorFunction%': needsEval,
      '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
      '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
      '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
      '%isFinite%': isFinite,
      '%isNaN%': isNaN,
      '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
      '%JSON%': typeof JSON === 'object' ? JSON : undefined,
      '%Map%': typeof Map === 'undefined' ? undefined : Map,
      '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
      '%Math%': Math,
      '%Number%': Number,
      '%Object%': Object,
      '%parseFloat%': parseFloat,
      '%parseInt%': parseInt,
      '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
      '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
      '%RangeError%': $RangeError,
      '%ReferenceError%': $ReferenceError,
      '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
      '%RegExp%': RegExp,
      '%Set%': typeof Set === 'undefined' ? undefined : Set,
      '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
      '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
      '%String%': String,
      '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
      '%Symbol%': hasSymbols ? Symbol : undefined,
      '%SyntaxError%': $SyntaxError,
      '%ThrowTypeError%': ThrowTypeError,
      '%TypedArray%': TypedArray,
      '%TypeError%': $TypeError,
      '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
      '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
      '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
      '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
      '%URIError%': $URIError,
      '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
      '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
      '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
    }

    if (getProto) {
      try {
        null.error // eslint-disable-line no-unused-expressions
      } catch (e) {
      // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
        var errorProto = getProto(getProto(e))
        INTRINSICS['%Error.prototype%'] = errorProto
      }
    }

    var doEval = function doEval (name) {
      var value
      if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}')
      } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}')
      } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}')
      } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%')
        if (fn) {
          value = fn.prototype
        }
      } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%')
        if (gen && getProto) {
          value = getProto(gen.prototype)
        }
      }

      INTRINSICS[name] = value

      return value
    }

    var LEGACY_ALIASES = {
      __proto__: null,
      '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
      '%ArrayPrototype%': ['Array', 'prototype'],
      '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
      '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
      '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
      '%ArrayProto_values%': ['Array', 'prototype', 'values'],
      '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
      '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
      '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
      '%BooleanPrototype%': ['Boolean', 'prototype'],
      '%DataViewPrototype%': ['DataView', 'prototype'],
      '%DatePrototype%': ['Date', 'prototype'],
      '%ErrorPrototype%': ['Error', 'prototype'],
      '%EvalErrorPrototype%': ['EvalError', 'prototype'],
      '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
      '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
      '%FunctionPrototype%': ['Function', 'prototype'],
      '%Generator%': ['GeneratorFunction', 'prototype'],
      '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
      '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
      '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
      '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
      '%JSONParse%': ['JSON', 'parse'],
      '%JSONStringify%': ['JSON', 'stringify'],
      '%MapPrototype%': ['Map', 'prototype'],
      '%NumberPrototype%': ['Number', 'prototype'],
      '%ObjectPrototype%': ['Object', 'prototype'],
      '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
      '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
      '%PromisePrototype%': ['Promise', 'prototype'],
      '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
      '%Promise_all%': ['Promise', 'all'],
      '%Promise_reject%': ['Promise', 'reject'],
      '%Promise_resolve%': ['Promise', 'resolve'],
      '%RangeErrorPrototype%': ['RangeError', 'prototype'],
      '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
      '%RegExpPrototype%': ['RegExp', 'prototype'],
      '%SetPrototype%': ['Set', 'prototype'],
      '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
      '%StringPrototype%': ['String', 'prototype'],
      '%SymbolPrototype%': ['Symbol', 'prototype'],
      '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
      '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
      '%TypeErrorPrototype%': ['TypeError', 'prototype'],
      '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
      '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
      '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
      '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
      '%URIErrorPrototype%': ['URIError', 'prototype'],
      '%WeakMapPrototype%': ['WeakMap', 'prototype'],
      '%WeakSetPrototype%': ['WeakSet', 'prototype']
    }

    var bind = require('function-bind')
    var hasOwn = require('hasown')
    var $concat = bind.call(Function.call, Array.prototype.concat)
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice)
    var $replace = bind.call(Function.call, String.prototype.replace)
    var $strSlice = bind.call(Function.call, String.prototype.slice)
    var $exec = bind.call(Function.call, RegExp.prototype.exec)

    /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
    var reEscapeChar = /\\(\\)?/g /** Used to match backslashes in property paths. */
    var stringToPath = function stringToPath (string) {
      var first = $strSlice(string, 0, 1)
      var last = $strSlice(string, -1)
      if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`')
      } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`')
      }
      var result = []
      $replace(string, rePropName, function (match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match
      })
      return result
    }
    /* end adaptation */

    var getBaseIntrinsic = function getBaseIntrinsic (name, allowMissing) {
      var intrinsicName = name
      var alias
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName]
        intrinsicName = '%' + alias[0] + '%'
      }

      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName]
        if (value === needsEval) {
          value = doEval(intrinsicName)
        }
        if (typeof value === 'undefined' && !allowMissing) {
          throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!')
        }

        return {
          alias: alias,
          name: intrinsicName,
          value: value
        }
      }

      throw new $SyntaxError('intrinsic ' + name + ' does not exist!')
    }

    module.exports = function GetIntrinsic (name, allowMissing) {
      if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError('intrinsic name must be a non-empty string')
      }
      if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError('"allowMissing" argument must be a boolean')
      }

      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name')
      }
      var parts = stringToPath(name)
      var intrinsicBaseName = parts.length > 0 ? parts[0] : ''

      var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing)
      var intrinsicRealName = intrinsic.name
      var value = intrinsic.value
      var skipFurtherCaching = false

      var alias = intrinsic.alias
      if (alias) {
        intrinsicBaseName = alias[0]
        $spliceApply(parts, $concat([0, 1], alias))
      }

      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i]
        var first = $strSlice(part, 0, 1)
        var last = $strSlice(part, -1)
        if (
          (
            (first === '"' || first === "'" || first === '`') ||
				(last === '"' || last === "'" || last === '`')
          ) &&
			first !== last
        ) {
          throw new $SyntaxError('property names with quotes must have matching quotes')
        }
        if (part === 'constructor' || !isOwn) {
          skipFurtherCaching = true
        }

        intrinsicBaseName += '.' + part
        intrinsicRealName = '%' + intrinsicBaseName + '%'

        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName]
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.')
            }
            return void undefined
          }
          if ($gOPD && (i + 1) >= parts.length) {
            var desc = $gOPD(value, part)
            isOwn = !!desc

            // By convention, when a data property is converted to an accessor
            // property to emulate a data property that does not suffer from
            // the override mistake, that accessor's getter is marked with
            // an `originalValue` property. Here, when we detect this, we
            // uphold the illusion by pretending to see that original data
            // property, i.e., returning the value rather than the getter
            // itself.
            if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
              value = desc.get
            } else {
              value = value[part]
            }
          } else {
            isOwn = hasOwn(value, part)
            value = value[part]
          }

          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value
          }
        }
      }
      return value
    }
  }, { 'es-errors': 114, 'es-errors/eval': 113, 'es-errors/range': 115, 'es-errors/ref': 116, 'es-errors/syntax': 117, 'es-errors/type': 118, 'es-errors/uri': 119, 'function-bind': 122, 'has-proto': 126, 'has-symbols': 127, hasown: 130 }],
  124: [function (require, module, exports) {
    'use strict'

    var GetIntrinsic = require('get-intrinsic')

    var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true)

    if ($gOPD) {
      try {
        $gOPD([], 'length')
      } catch (e) {
      // IE 8 has a broken gOPD
        $gOPD = null
      }
    }

    module.exports = $gOPD
  }, { 'get-intrinsic': 123 }],
  125: [function (require, module, exports) {
    'use strict'

    var GetIntrinsic = require('get-intrinsic')

    var $defineProperty = GetIntrinsic('%Object.defineProperty%', true)

    var hasPropertyDescriptors = function hasPropertyDescriptors () {
      if ($defineProperty) {
        try {
          $defineProperty({}, 'a', { value: 1 })
          return true
        } catch (e) {
        // IE 8 has a broken defineProperty
          return false
        }
      }
      return false
    }

    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug () {
    // node v0.6 has a bug where array lengths can be Set but not Defined
      if (!hasPropertyDescriptors()) {
        return null
      }
      try {
        return $defineProperty([], 'length', { value: 1 }).length !== 1
      } catch (e) {
      // In Firefox 4-22, defining length on an array throws an exception.
        return true
      }
    }

    module.exports = hasPropertyDescriptors
  }, { 'get-intrinsic': 123 }],
  126: [function (require, module, exports) {
    'use strict'

    var test = {
      foo: {}
    }

    var $Object = Object

    module.exports = function hasProto () {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object)
    }
  }, {}],
  127: [function (require, module, exports) {
    'use strict'

    var origSymbol = typeof Symbol !== 'undefined' && Symbol
    var hasSymbolSham = require('./shams')

    module.exports = function hasNativeSymbols () {
      if (typeof origSymbol !== 'function') { return false }
      if (typeof Symbol !== 'function') { return false }
      if (typeof origSymbol('foo') !== 'symbol') { return false }
      if (typeof Symbol('bar') !== 'symbol') { return false }

      return hasSymbolSham()
    }
  }, { './shams': 128 }],
  128: [function (require, module, exports) {
    'use strict'

    /* eslint complexity: [2, 18], max-statements: [2, 33] */
    module.exports = function hasSymbols () {
      if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false }
      if (typeof Symbol.iterator === 'symbol') { return true }

      var obj = {}
      var sym = Symbol('test')
      var symObj = Object(sym)
      if (typeof sym === 'string') { return false }

      if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false }
      if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false }

      // temp disabled per https://github.com/ljharb/object.assign/issues/17
      // if (sym instanceof Symbol) { return false; }
      // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
      // if (!(symObj instanceof Symbol)) { return false; }

      // if (typeof Symbol.prototype.toString !== 'function') { return false; }
      // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

      var symVal = 42
      obj[sym] = symVal
      for (sym in obj) { return false } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
      if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false }

      if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false }

      var syms = Object.getOwnPropertySymbols(obj)
      if (syms.length !== 1 || syms[0] !== sym) { return false }

      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false }

      if (typeof Object.getOwnPropertyDescriptor === 'function') {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym)
        if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false }
      }

      return true
    }
  }, {}],
  129: [function (require, module, exports) {
    'use strict'

    var hasSymbols = require('has-symbols/shams')

    /** @type {import('.')} */
    module.exports = function hasToStringTagShams () {
      return hasSymbols() && !!Symbol.toStringTag
    }
  }, { 'has-symbols/shams': 128 }],
  130: [function (require, module, exports) {
    'use strict'

    var call = Function.prototype.call
    var $hasOwn = Object.prototype.hasOwnProperty
    var bind = require('function-bind')

    /** @type {(o: {}, p: PropertyKey) => p is keyof o} */
    module.exports = bind.call(call, $hasOwn)
  }, { 'function-bind': 122 }],
  131: [function (require, module, exports) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits (ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          })
        }
      }
    } else {
      // old school shim for old browsers
      module.exports = function inherits (ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor
          var TempCtor = function () {}
          TempCtor.prototype = superCtor.prototype
          ctor.prototype = new TempCtor()
          ctor.prototype.constructor = ctor
        }
      }
    }
  }, {}],
  132: [function (require, module, exports) {
    'use strict'

    var hasToStringTag = require('has-tostringtag/shams')()
    var callBound = require('call-bind/callBound')

    var $toString = callBound('Object.prototype.toString')

    var isStandardArguments = function isArguments (value) {
      if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
        return false
      }
      return $toString(value) === '[object Arguments]'
    }

    var isLegacyArguments = function isArguments (value) {
      if (isStandardArguments(value)) {
        return true
      }
      return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]'
    }

    var supportsStandardArguments = (function () {
      return isStandardArguments(arguments)
    }())

    isStandardArguments.isLegacyArguments = isLegacyArguments // for tests

    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments
  }, { 'call-bind/callBound': 110, 'has-tostringtag/shams': 129 }],
  133: [function (require, module, exports) {
    'use strict'

    var fnToStr = Function.prototype.toString
    var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply
    var badArrayLike
    var isCallableMarker
    if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
      try {
        badArrayLike = Object.defineProperty({}, 'length', {
          get: function () {
            throw isCallableMarker
          }
        })
        isCallableMarker = {}
        // eslint-disable-next-line no-throw-literal
        reflectApply(function () { throw 42 }, null, badArrayLike)
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null
        }
      }
    } else {
      reflectApply = null
    }

    var constructorRegex = /^\s*class\b/
    var isES6ClassFn = function isES6ClassFunction (value) {
      try {
        var fnStr = fnToStr.call(value)
        return constructorRegex.test(fnStr)
      } catch (e) {
        return false // not a function
      }
    }

    var tryFunctionObject = function tryFunctionToStr (value) {
      try {
        if (isES6ClassFn(value)) { return false }
        fnToStr.call(value)
        return true
      } catch (e) {
        return false
      }
    }
    var toStr = Object.prototype.toString
    var objectClass = '[object Object]'
    var fnClass = '[object Function]'
    var genClass = '[object GeneratorFunction]'
    var ddaClass = '[object HTMLAllCollection]' // IE 11
    var ddaClass2 = '[object HTML document.all class]'
    var ddaClass3 = '[object HTMLCollection]' // IE 9-10
    var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag // better: use `has-tostringtag`

    var isIE68 = !(0 in [,]) // eslint-disable-line no-sparse-arrays, comma-spacing

    var isDDA = function isDocumentDotAll () { return false }
    if (typeof document === 'object') {
    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
      var all = document.all
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll (value) {
        /* globals document: false */
        // in IE 6-8, typeof document.all is "object" and it's truthy
          if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
            try {
              var str = toStr.call(value)
              return (
                str === ddaClass ||
						str === ddaClass2 ||
						str === ddaClass3 || // opera 12.16
						str === objectClass // IE 6-8
              ) && value('') == null // eslint-disable-line eqeqeq
            } catch (e) { /**/ }
          }
          return false
        }
      }
    }

    module.exports = reflectApply
      ? function isCallable (value) {
        if (isDDA(value)) { return true }
        if (!value) { return false }
        if (typeof value !== 'function' && typeof value !== 'object') { return false }
        try {
          reflectApply(value, null, badArrayLike)
        } catch (e) {
          if (e !== isCallableMarker) { return false }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value)
      }
      : function isCallable (value) {
        if (isDDA(value)) { return true }
        if (!value) { return false }
        if (typeof value !== 'function' && typeof value !== 'object') { return false }
        if (hasToStringTag) { return tryFunctionObject(value) }
        if (isES6ClassFn(value)) { return false }
        var strClass = toStr.call(value)
        if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false }
        return tryFunctionObject(value)
      }
  }, {}],
  134: [function (require, module, exports) {
    'use strict'

    var toStr = Object.prototype.toString
    var fnToStr = Function.prototype.toString
    var isFnRegex = /^\s*(?:function)?\*/
    var hasToStringTag = require('has-tostringtag/shams')()
    var getProto = Object.getPrototypeOf
    var getGeneratorFunc = function () { // eslint-disable-line consistent-return
      if (!hasToStringTag) {
        return false
      }
      try {
        return Function('return function*() {}')()
      } catch (e) {
      }
    }
    var GeneratorFunction

    module.exports = function isGeneratorFunction (fn) {
      if (typeof fn !== 'function') {
        return false
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn)
        return str === '[object GeneratorFunction]'
      }
      if (!getProto) {
        return false
      }
      if (typeof GeneratorFunction === 'undefined') {
        var generatorFunc = getGeneratorFunc()
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false
      }
      return getProto(fn) === GeneratorFunction
    }
  }, { 'has-tostringtag/shams': 129 }],
  135: [function (require, module, exports) {
    'use strict'

    var whichTypedArray = require('which-typed-array')

    /** @type {import('.')} */
    module.exports = function isTypedArray (value) {
      return !!whichTypedArray(value)
    }
  }, { 'which-typed-array': 141 }],
  136: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {}

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout
    var cachedClearTimeout

    function defaultSetTimout () {
      throw new Error('setTimeout has not been defined')
    }
    function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined')
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout
        } else {
          cachedSetTimeout = defaultSetTimout
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout
        } else {
          cachedClearTimeout = defaultClearTimeout
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout
      }
    }())
    function runTimeout (fun) {
      if (cachedSetTimeout === setTimeout) {
      // normal enviroments in sane situations
        return setTimeout(fun, 0)
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout
        return setTimeout(fun, 0)
      }
      try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0)
      } catch (e) {
        try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0)
        } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0)
        }
      }
    }
    function runClearTimeout (marker) {
      if (cachedClearTimeout === clearTimeout) {
      // normal enviroments in sane situations
        return clearTimeout(marker)
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout
        return clearTimeout(marker)
      }
      try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker)
      } catch (e) {
        try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker)
        } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker)
        }
      }
    }
    var queue = []
    var draining = false
    var currentQueue
    var queueIndex = -1

    function cleanUpNextTick () {
      if (!draining || !currentQueue) {
        return
      }
      draining = false
      if (currentQueue.length) {
        queue = currentQueue.concat(queue)
      } else {
        queueIndex = -1
      }
      if (queue.length) {
        drainQueue()
      }
    }

    function drainQueue () {
      if (draining) {
        return
      }
      var timeout = runTimeout(cleanUpNextTick)
      draining = true

      var len = queue.length
      while (len) {
        currentQueue = queue
        queue = []
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run()
          }
        }
        queueIndex = -1
        len = queue.length
      }
      currentQueue = null
      draining = false
      runClearTimeout(timeout)
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1)
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i]
        }
      }
      queue.push(new Item(fun, args))
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue)
      }
    }

    // v8 likes predictible objects
    function Item (fun, array) {
      this.fun = fun
      this.array = array
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array)
    }
    process.title = 'browser'
    process.browser = true
    process.env = {}
    process.argv = []
    process.version = '' // empty string to avoid regexp issues
    process.versions = {}

    function noop () {}

    process.on = noop
    process.addListener = noop
    process.once = noop
    process.off = noop
    process.removeListener = noop
    process.removeAllListeners = noop
    process.emit = noop
    process.prependListener = noop
    process.prependOnceListener = noop

    process.listeners = function (name) { return [] }

    process.binding = function (name) {
      throw new Error('process.binding is not supported')
    }

    process.cwd = function () { return '/' }
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported')
    }
    process.umask = function () { return 0 }
  }, {}],
  137: [function (require, module, exports) {
    'use strict'

    var GetIntrinsic = require('get-intrinsic')
    var define = require('define-data-property')
    var hasDescriptors = require('has-property-descriptors')()
    var gOPD = require('gopd')

    var $TypeError = require('es-errors/type')
    var $floor = GetIntrinsic('%Math.floor%')

    /** @typedef {(...args: unknown[]) => unknown} Func */

    /** @type {<T extends Func = Func>(fn: T, length: number, loose?: boolean) => T} */
    module.exports = function setFunctionLength (fn, length) {
      if (typeof fn !== 'function') {
        throw new $TypeError('`fn` is not a function')
      }
      if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
        throw new $TypeError('`length` must be a positive 32-bit integer')
      }

      var loose = arguments.length > 2 && !!arguments[2]

      var functionLengthIsConfigurable = true
      var functionLengthIsWritable = true
      if ('length' in fn && gOPD) {
        var desc = gOPD(fn, 'length')
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false
        }
      }

      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true)
        } else {
          define(/** @type {Parameters<define>[0]} */ (fn), 'length', length)
        }
      }
      return fn
    }
  }, { 'define-data-property': 112, 'es-errors/type': 118, 'get-intrinsic': 123, gopd: 124, 'has-property-descriptors': 125 }],
  138: [function (require, module, exports) {
    module.exports = function isBuffer (arg) {
      return arg && typeof arg === 'object' &&
    typeof arg.copy === 'function' &&
    typeof arg.fill === 'function' &&
    typeof arg.readUInt8 === 'function'
    }
  }, {}],
  139: [function (require, module, exports) {
    // Currently in sync with Node.js lib/internal/util/types.js
    // https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

    'use strict'

    var isArgumentsObject = require('is-arguments')
    var isGeneratorFunction = require('is-generator-function')
    var whichTypedArray = require('which-typed-array')
    var isTypedArray = require('is-typed-array')

    function uncurryThis (f) {
      return f.call.bind(f)
    }

    var BigIntSupported = typeof BigInt !== 'undefined'
    var SymbolSupported = typeof Symbol !== 'undefined'

    var ObjectToString = uncurryThis(Object.prototype.toString)

    var numberValue = uncurryThis(Number.prototype.valueOf)
    var stringValue = uncurryThis(String.prototype.valueOf)
    var booleanValue = uncurryThis(Boolean.prototype.valueOf)

    if (BigIntSupported) {
      var bigIntValue = uncurryThis(BigInt.prototype.valueOf)
    }

    if (SymbolSupported) {
      var symbolValue = uncurryThis(Symbol.prototype.valueOf)
    }

    function checkBoxedPrimitive (value, prototypeValueOf) {
      if (typeof value !== 'object') {
        return false
      }
      try {
        prototypeValueOf(value)
        return true
      } catch (e) {
        return false
      }
    }

    exports.isArgumentsObject = isArgumentsObject
    exports.isGeneratorFunction = isGeneratorFunction
    exports.isTypedArray = isTypedArray

    // Taken from here and modified for better browser support
    // https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
    function isPromise (input) {
      return (
        (
          typeof Promise !== 'undefined' &&
			input instanceof Promise
        ) ||
		(
		  input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
      )
    }
    exports.isPromise = isPromise

    function isArrayBufferView (value) {
      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value)
      }

      return (
        isTypedArray(value) ||
    isDataView(value)
      )
    }
    exports.isArrayBufferView = isArrayBufferView

    function isUint8Array (value) {
      return whichTypedArray(value) === 'Uint8Array'
    }
    exports.isUint8Array = isUint8Array

    function isUint8ClampedArray (value) {
      return whichTypedArray(value) === 'Uint8ClampedArray'
    }
    exports.isUint8ClampedArray = isUint8ClampedArray

    function isUint16Array (value) {
      return whichTypedArray(value) === 'Uint16Array'
    }
    exports.isUint16Array = isUint16Array

    function isUint32Array (value) {
      return whichTypedArray(value) === 'Uint32Array'
    }
    exports.isUint32Array = isUint32Array

    function isInt8Array (value) {
      return whichTypedArray(value) === 'Int8Array'
    }
    exports.isInt8Array = isInt8Array

    function isInt16Array (value) {
      return whichTypedArray(value) === 'Int16Array'
    }
    exports.isInt16Array = isInt16Array

    function isInt32Array (value) {
      return whichTypedArray(value) === 'Int32Array'
    }
    exports.isInt32Array = isInt32Array

    function isFloat32Array (value) {
      return whichTypedArray(value) === 'Float32Array'
    }
    exports.isFloat32Array = isFloat32Array

    function isFloat64Array (value) {
      return whichTypedArray(value) === 'Float64Array'
    }
    exports.isFloat64Array = isFloat64Array

    function isBigInt64Array (value) {
      return whichTypedArray(value) === 'BigInt64Array'
    }
    exports.isBigInt64Array = isBigInt64Array

    function isBigUint64Array (value) {
      return whichTypedArray(value) === 'BigUint64Array'
    }
    exports.isBigUint64Array = isBigUint64Array

    function isMapToString (value) {
      return ObjectToString(value) === '[object Map]'
    }
    isMapToString.working = (
      typeof Map !== 'undefined' &&
  isMapToString(new Map())
    )

    function isMap (value) {
      if (typeof Map === 'undefined') {
        return false
      }

      return isMapToString.working
        ? isMapToString(value)
        : value instanceof Map
    }
    exports.isMap = isMap

    function isSetToString (value) {
      return ObjectToString(value) === '[object Set]'
    }
    isSetToString.working = (
      typeof Set !== 'undefined' &&
  isSetToString(new Set())
    )
    function isSet (value) {
      if (typeof Set === 'undefined') {
        return false
      }

      return isSetToString.working
        ? isSetToString(value)
        : value instanceof Set
    }
    exports.isSet = isSet

    function isWeakMapToString (value) {
      return ObjectToString(value) === '[object WeakMap]'
    }
    isWeakMapToString.working = (
      typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
    )
    function isWeakMap (value) {
      if (typeof WeakMap === 'undefined') {
        return false
      }

      return isWeakMapToString.working
        ? isWeakMapToString(value)
        : value instanceof WeakMap
    }
    exports.isWeakMap = isWeakMap

    function isWeakSetToString (value) {
      return ObjectToString(value) === '[object WeakSet]'
    }
    isWeakSetToString.working = (
      typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
    )
    function isWeakSet (value) {
      return isWeakSetToString(value)
    }
    exports.isWeakSet = isWeakSet

    function isArrayBufferToString (value) {
      return ObjectToString(value) === '[object ArrayBuffer]'
    }
    isArrayBufferToString.working = (
      typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
    )
    function isArrayBuffer (value) {
      if (typeof ArrayBuffer === 'undefined') {
        return false
      }

      return isArrayBufferToString.working
        ? isArrayBufferToString(value)
        : value instanceof ArrayBuffer
    }
    exports.isArrayBuffer = isArrayBuffer

    function isDataViewToString (value) {
      return ObjectToString(value) === '[object DataView]'
    }
    isDataViewToString.working = (
      typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
    )
    function isDataView (value) {
      if (typeof DataView === 'undefined') {
        return false
      }

      return isDataViewToString.working
        ? isDataViewToString(value)
        : value instanceof DataView
    }
    exports.isDataView = isDataView

    // Store a copy of SharedArrayBuffer in case it's deleted elsewhere
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined
    function isSharedArrayBufferToString (value) {
      return ObjectToString(value) === '[object SharedArrayBuffer]'
    }
    function isSharedArrayBuffer (value) {
      if (typeof SharedArrayBufferCopy === 'undefined') {
        return false
      }

      if (typeof isSharedArrayBufferToString.working === 'undefined') {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy())
      }

      return isSharedArrayBufferToString.working
        ? isSharedArrayBufferToString(value)
        : value instanceof SharedArrayBufferCopy
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer

    function isAsyncFunction (value) {
      return ObjectToString(value) === '[object AsyncFunction]'
    }
    exports.isAsyncFunction = isAsyncFunction

    function isMapIterator (value) {
      return ObjectToString(value) === '[object Map Iterator]'
    }
    exports.isMapIterator = isMapIterator

    function isSetIterator (value) {
      return ObjectToString(value) === '[object Set Iterator]'
    }
    exports.isSetIterator = isSetIterator

    function isGeneratorObject (value) {
      return ObjectToString(value) === '[object Generator]'
    }
    exports.isGeneratorObject = isGeneratorObject

    function isWebAssemblyCompiledModule (value) {
      return ObjectToString(value) === '[object WebAssembly.Module]'
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule

    function isNumberObject (value) {
      return checkBoxedPrimitive(value, numberValue)
    }
    exports.isNumberObject = isNumberObject

    function isStringObject (value) {
      return checkBoxedPrimitive(value, stringValue)
    }
    exports.isStringObject = isStringObject

    function isBooleanObject (value) {
      return checkBoxedPrimitive(value, booleanValue)
    }
    exports.isBooleanObject = isBooleanObject

    function isBigIntObject (value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue)
    }
    exports.isBigIntObject = isBigIntObject

    function isSymbolObject (value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue)
    }
    exports.isSymbolObject = isSymbolObject

    function isBoxedPrimitive (value) {
      return (
        isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
      )
    }
    exports.isBoxedPrimitive = isBoxedPrimitive

    function isAnyArrayBuffer (value) {
      return typeof Uint8Array !== 'undefined' && (
        isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
      )
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;

    ['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function (method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function () {
          throw new Error(method + ' is not supported in userland')
        }
      })
    })
  }, { 'is-arguments': 132, 'is-generator-function': 134, 'is-typed-array': 135, 'which-typed-array': 141 }],
  140: [function (require, module, exports) {
    (function (process) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors (obj) {
    var keys = Object.keys(obj)
    var descriptors = {}
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i])
    }
    return descriptors
  }

        var formatRegExp = /%[sdj%]/g
        exports.format = function (f) {
          if (!isString(f)) {
            var objects = []
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]))
            }
            return objects.join(' ')
          }

          var i = 1
          var args = arguments
          var len = args.length
          var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%'
            if (i >= len) return x
            switch (x) {
              case '%s': return String(args[i++])
              case '%d': return Number(args[i++])
              case '%j':
                try {
                  return JSON.stringify(args[i++])
                } catch (_) {
                  return '[Circular]'
                }
              default:
                return x
            }
          })
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += ' ' + x
            } else {
              str += ' ' + inspect(x)
            }
          }
          return str
        }

        // Mark that a method should not be used.
        // Returns a modified function which warns once by default.
        // If --no-deprecation is set, then it is a no-op.
        exports.deprecate = function (fn, msg) {
          if (typeof process !== 'undefined' && process.noDeprecation === true) {
            return fn
          }

          // Allow for deprecating things in the process of starting up.
          if (typeof process === 'undefined') {
            return function () {
              return exports.deprecate(fn, msg).apply(this, arguments)
            }
          }

          var warned = false
          function deprecated () {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg)
              } else if (process.traceDeprecation) {
                console.trace(msg)
              } else {
                console.error(msg)
              }
              warned = true
            }
            return fn.apply(this, arguments)
          }

          return deprecated
        }

        var debugs = {}
        var debugEnvRegex = /^$/

        if (process.env.NODE_DEBUG) {
          var debugEnv = process.env.NODE_DEBUG
          debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
            .replace(/\*/g, '.*')
            .replace(/,/g, '$|^')
            .toUpperCase()
          debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i')
        }
        exports.debuglog = function (set) {
          set = set.toUpperCase()
          if (!debugs[set]) {
            if (debugEnvRegex.test(set)) {
              var pid = process.pid
              debugs[set] = function () {
                var msg = exports.format.apply(exports, arguments)
                console.error('%s %d: %s', set, pid, msg)
              }
            } else {
              debugs[set] = function () {}
            }
          }
          return debugs[set]
        }

        /**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
        /* legacy: obj, showHidden, depth, colors */
        function inspect (obj, opts) {
          // default options
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          }
          // legacy...
          if (arguments.length >= 3) ctx.depth = arguments[2]
          if (arguments.length >= 4) ctx.colors = arguments[3]
          if (isBoolean(opts)) {
            // legacy...
            ctx.showHidden = opts
          } else if (opts) {
            // got an "options" object
            exports._extend(ctx, opts)
          }
          // set default options
          if (isUndefined(ctx.showHidden)) ctx.showHidden = false
          if (isUndefined(ctx.depth)) ctx.depth = 2
          if (isUndefined(ctx.colors)) ctx.colors = false
          if (isUndefined(ctx.customInspect)) ctx.customInspect = true
          if (ctx.colors) ctx.stylize = stylizeWithColor
          return formatValue(ctx, obj, ctx.depth)
        }
        exports.inspect = inspect

        // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
        inspect.colors = {
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          white: [37, 39],
          grey: [90, 39],
          black: [30, 39],
          blue: [34, 39],
          cyan: [36, 39],
          green: [32, 39],
          magenta: [35, 39],
          red: [31, 39],
          yellow: [33, 39]
        }

        // Don't use 'blue' not visible on cmd.exe
        inspect.styles = {
          special: 'cyan',
          number: 'yellow',
          boolean: 'yellow',
          undefined: 'grey',
          null: 'bold',
          string: 'green',
          date: 'magenta',
          // "name": intentionally not styling
          regexp: 'red'
        }

        function stylizeWithColor (str, styleType) {
          var style = inspect.styles[styleType]

          if (style) {
            return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm'
          } else {
            return str
          }
        }

        function stylizeNoColor (str, styleType) {
          return str
        }

        function arrayToHash (array) {
          var hash = {}

          array.forEach(function (val, idx) {
            hash[val] = true
          })

          return hash
        }

        function formatValue (ctx, value, recurseTimes) {
          // Provide a hook for user-specified inspect functions.
          // Check that value is an object with an inspect function on it
          if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx)
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes)
            }
            return ret
          }

          // Primitive types cannot have properties
          var primitive = formatPrimitive(ctx, value)
          if (primitive) {
            return primitive
          }

          // Look up the keys of the object.
          var keys = Object.keys(value)
          var visibleKeys = arrayToHash(keys)

          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value)
          }

          // IE doesn't make error fields non-enumerable
          // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
          if (isError(value) &&
      (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
            return formatError(value)
          }

          // Some type of object without properties can be shortcutted.
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ': ' + value.name : ''
              return ctx.stylize('[Function' + name + ']', 'special')
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp')
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), 'date')
            }
            if (isError(value)) {
              return formatError(value)
            }
          }

          var base = ''; var array = false; var braces = ['{', '}']

          // Make Array say that they are Array
          if (isArray(value)) {
            array = true
            braces = ['[', ']']
          }

          // Make functions say that they are functions
          if (isFunction(value)) {
            var n = value.name ? ': ' + value.name : ''
            base = ' [Function' + n + ']'
          }

          // Make RegExps say that they are RegExps
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value)
          }

          // Make dates with properties first say the date
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value)
          }

          // Make error with message first say the error
          if (isError(value)) {
            base = ' ' + formatError(value)
          }

          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1]
          }

          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp')
            } else {
              return ctx.stylize('[Object]', 'special')
            }
          }

          ctx.seen.push(value)

          var output
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys)
          } else {
            output = keys.map(function (key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array)
            })
          }

          ctx.seen.pop()

          return reduceToSingleString(output, base, braces)
        }

        function formatPrimitive (ctx, value) {
          if (isUndefined(value)) { return ctx.stylize('undefined', 'undefined') }
          if (isString(value)) {
            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
              .replace(/'/g, "\\'")
              .replace(/\\"/g, '"') + '\''
            return ctx.stylize(simple, 'string')
          }
          if (isNumber(value)) { return ctx.stylize('' + value, 'number') }
          if (isBoolean(value)) { return ctx.stylize('' + value, 'boolean') }
          // For some reason typeof null is "object", so special case here.
          if (isNull(value)) { return ctx.stylize('null', 'null') }
        }

        function formatError (value) {
          return '[' + Error.prototype.toString.call(value) + ']'
        }

        function formatArray (ctx, value, recurseTimes, visibleKeys, keys) {
          var output = []
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                String(i), true))
            } else {
              output.push('')
            }
          }
          keys.forEach(function (key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                key, true))
            }
          })
          return output
        }

        function formatProperty (ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc
          desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize('[Getter/Setter]', 'special')
            } else {
              str = ctx.stylize('[Getter]', 'special')
            }
          } else {
            if (desc.set) {
              str = ctx.stylize('[Setter]', 'special')
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = '[' + key + ']'
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null)
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1)
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function (line) {
                    return '  ' + line
                  }).join('\n').slice(2)
                } else {
                  str = '\n' + str.split('\n').map(function (line) {
                    return '   ' + line
                  }).join('\n')
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special')
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str
            }
            name = JSON.stringify('' + key)
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.slice(1, -1)
              name = ctx.stylize(name, 'name')
            } else {
              name = name.replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'")
              name = ctx.stylize(name, 'string')
            }
          }

          return name + ': ' + str
        }

        function reduceToSingleString (output, base, braces) {
          var numLinesEst = 0
          var length = output.reduce(function (prev, cur) {
            numLinesEst++
            if (cur.indexOf('\n') >= 0) numLinesEst++
            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1
          }, 0)

          if (length > 60) {
            return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1]
          }

          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1]
        }

        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.
        exports.types = require('./support/types')

        function isArray (ar) {
          return Array.isArray(ar)
        }
        exports.isArray = isArray

        function isBoolean (arg) {
          return typeof arg === 'boolean'
        }
        exports.isBoolean = isBoolean

        function isNull (arg) {
          return arg === null
        }
        exports.isNull = isNull

        function isNullOrUndefined (arg) {
          return arg == null
        }
        exports.isNullOrUndefined = isNullOrUndefined

        function isNumber (arg) {
          return typeof arg === 'number'
        }
        exports.isNumber = isNumber

        function isString (arg) {
          return typeof arg === 'string'
        }
        exports.isString = isString

        function isSymbol (arg) {
          return typeof arg === 'symbol'
        }
        exports.isSymbol = isSymbol

        function isUndefined (arg) {
          return arg === void 0
        }
        exports.isUndefined = isUndefined

        function isRegExp (re) {
          return isObject(re) && objectToString(re) === '[object RegExp]'
        }
        exports.isRegExp = isRegExp
        exports.types.isRegExp = isRegExp

        function isObject (arg) {
          return typeof arg === 'object' && arg !== null
        }
        exports.isObject = isObject

        function isDate (d) {
          return isObject(d) && objectToString(d) === '[object Date]'
        }
        exports.isDate = isDate
        exports.types.isDate = isDate

        function isError (e) {
          return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error)
        }
        exports.isError = isError
        exports.types.isNativeError = isError

        function isFunction (arg) {
          return typeof arg === 'function'
        }
        exports.isFunction = isFunction

        function isPrimitive (arg) {
          return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' || // ES6 symbol
         typeof arg === 'undefined'
        }
        exports.isPrimitive = isPrimitive

        exports.isBuffer = require('./support/isBuffer')

        function objectToString (o) {
          return Object.prototype.toString.call(o)
        }

        function pad (n) {
          return n < 10 ? '0' + n.toString(10) : n.toString(10)
        }

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
          'Oct', 'Nov', 'Dec']

        // 26 Feb 16:19:34
        function timestamp () {
          var d = new Date()
          var time = [pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())].join(':')
          return [d.getDate(), months[d.getMonth()], time].join(' ')
        }

        // log is just a thin wrapper to console.log that prepends a timestamp
        exports.log = function () {
          console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments))
        }

        /**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
        exports.inherits = require('inherits')

        exports._extend = function (origin, add) {
          // Don't do anything if add isn't an object
          if (!add || !isObject(add)) return origin

          var keys = Object.keys(add)
          var i = keys.length
          while (i--) {
            origin[keys[i]] = add[keys[i]]
          }
          return origin
        }

        function hasOwnProperty (obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop)
        }

        var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined

        exports.promisify = function promisify (original) {
          if (typeof original !== 'function') { throw new TypeError('The "original" argument must be of type Function') }

          if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
            var fn = original[kCustomPromisifiedSymbol]
            if (typeof fn !== 'function') {
              throw new TypeError('The "util.promisify.custom" argument must be of type Function')
            }
            Object.defineProperty(fn, kCustomPromisifiedSymbol, {
              value: fn, enumerable: false, writable: false, configurable: true
            })
            return fn
          }

          function fn () {
            var promiseResolve, promiseReject
            var promise = new Promise(function (resolve, reject) {
              promiseResolve = resolve
              promiseReject = reject
            })

            var args = []
            for (var i = 0; i < arguments.length; i++) {
              args.push(arguments[i])
            }
            args.push(function (err, value) {
              if (err) {
                promiseReject(err)
              } else {
                promiseResolve(value)
              }
            })

            try {
              original.apply(this, args)
            } catch (err) {
              promiseReject(err)
            }

            return promise
          }

          Object.setPrototypeOf(fn, Object.getPrototypeOf(original))

          if (kCustomPromisifiedSymbol) {
            Object.defineProperty(fn, kCustomPromisifiedSymbol, {
              value: fn, enumerable: false, writable: false, configurable: true
            })
          }
          return Object.defineProperties(
            fn,
            getOwnPropertyDescriptors(original)
          )
        }

        exports.promisify.custom = kCustomPromisifiedSymbol

        function callbackifyOnRejected (reason, cb) {
          // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
          // Because `null` is a special error value in callbacks which means "no error
          // occurred", we error-wrap so the callback consumer can distinguish between
          // "the promise rejected with null" or "the promise fulfilled with undefined".
          if (!reason) {
            var newReason = new Error('Promise was rejected with a falsy value')
            newReason.reason = reason
            reason = newReason
          }
          return cb(reason)
        }

        function callbackify (original) {
          if (typeof original !== 'function') {
            throw new TypeError('The "original" argument must be of type Function')
          }

          // We DO NOT return the promise as it gives the user a false sense that
          // the promise is actually somehow related to the callback's execution
          // and that the callback throwing will reject the promise.
          function callbackified () {
            var args = []
            for (var i = 0; i < arguments.length; i++) {
              args.push(arguments[i])
            }

            var maybeCb = args.pop()
            if (typeof maybeCb !== 'function') {
              throw new TypeError('The last argument must be of type Function')
            }
            var self = this
            var cb = function () {
              return maybeCb.apply(self, arguments)
            }
            // In true node style we process the callback on `nextTick` with all the
            // implications (stack, `uncaughtException`, `async_hooks`)
            original.apply(this, args)
              .then(function (ret) { process.nextTick(cb.bind(null, null, ret)) },
                function (rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) })
          }

          Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original))
          Object.defineProperties(callbackified,
            getOwnPropertyDescriptors(original))
          return callbackified
        }
        exports.callbackify = callbackify
      }).call(this)
    }).call(this, require('_process'))
  }, { './support/isBuffer': 138, './support/types': 139, _process: 136, inherits: 131 }],
  141: [function (require, module, exports) {
    (function (global) {
      (function () {
        'use strict'

        var forEach = require('for-each')
        var availableTypedArrays = require('available-typed-arrays')
        var callBind = require('call-bind')
        var callBound = require('call-bind/callBound')
        var gOPD = require('gopd')

        var $toString = callBound('Object.prototype.toString')
        var hasToStringTag = require('has-tostringtag/shams')()

        var g = typeof globalThis === 'undefined' ? global : globalThis
        var typedArrays = availableTypedArrays()

        var $slice = callBound('String.prototype.slice')
        var getPrototypeOf = Object.getPrototypeOf // require('getprototypeof');

        var $indexOf = callBound('Array.prototype.indexOf', true) || /** @type {(array: readonly unknown[], value: unknown) => keyof array} */ function indexOf (array, value) {
          for (var i = 0; i < array.length; i += 1) {
            if (array[i] === value) {
              return i
            }
          }
          return -1
        }

        /** @typedef {Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array} TypedArray */
        /** @typedef {'Int8Array' | 'Uint8Array' | 'Uint8ClampedArray' | 'Int16Array' | 'Uint16Array' | 'Int32Array' | 'Uint32Array' | 'Float32Array' | 'Float64Array' | 'BigInt64Array' | 'BigUint64Array'} TypedArrayName */
        /** @type {{ [k in `\$${TypedArrayName}`]?: (receiver: TypedArray) => string | typeof Uint8Array.prototype.slice.call | typeof Uint8Array.prototype.set.call } & { __proto__: null }} */
        var cache = { __proto__: null }
        if (hasToStringTag && gOPD && getPrototypeOf) {
          forEach(typedArrays, function (typedArray) {
            var arr = new g[typedArray]()
            if (Symbol.toStringTag in arr) {
              var proto = getPrototypeOf(arr)
              // @ts-expect-error TS won't narrow inside a closure
              var descriptor = gOPD(proto, Symbol.toStringTag)
              if (!descriptor) {
                var superProto = getPrototypeOf(proto)
                // @ts-expect-error TS won't narrow inside a closure
                descriptor = gOPD(superProto, Symbol.toStringTag)
              }
              // @ts-expect-error TODO: fix
              cache['$' + typedArray] = callBind(descriptor.get)
            }
          })
        } else {
          forEach(typedArrays, function (typedArray) {
            var arr = new g[typedArray]()
            var fn = arr.slice || arr.set
            if (fn) {
              // @ts-expect-error TODO: fix
              cache['$' + typedArray] = callBind(fn)
            }
          })
        }

        /** @type {import('.')} */
        var tryTypedArrays = function tryAllTypedArrays (value) {
          /** @type {ReturnType<tryAllTypedArrays>} */ var found = false
          forEach(
            // eslint-disable-next-line no-extra-parens
            /** @type {Record<`\$${TypedArrayName}`, typeof cache>} */ /** @type {any} */ (cache),
            /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */ function (getter, typedArray) {
              if (!found) {
                try {
                  // @ts-expect-error TODO: fix
                  if ('$' + getter(value) === typedArray) {
                    found = $slice(typedArray, 1)
                  }
                } catch (e) { /**/ }
              }
            }
          )
          return found
        }

        /** @type {import('.')} */
        var trySlices = function tryAllSlices (value) {
          /** @type {ReturnType<tryAllSlices>} */ var found = false
          forEach(
            // eslint-disable-next-line no-extra-parens
            /** @type {any} */ (cache),
            /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */ function (getter, name) {
              if (!found) {
                try {
                  // @ts-expect-error TODO: fix
                  getter(value)
                  found = $slice(name, 1)
                } catch (e) { /**/ }
              }
            }
          )
          return found
        }

        /** @type {import('.')} */
        module.exports = function whichTypedArray (value) {
          if (!value || typeof value !== 'object') { return false }
          if (!hasToStringTag) {
            var tag = $slice($toString(value), 8, -1)
            if ($indexOf(typedArrays, tag) > -1) {
              return tag
            }
            if (tag !== 'Object') {
              return false
            }
            // node < 0.6 hits here on real Typed Arrays
            return trySlices(value)
          }
          if (!gOPD) { return null } // unknown engine
          return tryTypedArrays(value)
        }
      }).call(this)
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
  }, { 'available-typed-arrays': 108, 'call-bind': 111, 'call-bind/callBound': 110, 'for-each': 120, gopd: 124, 'has-tostringtag/shams': 129 }]
}, {}, [107])

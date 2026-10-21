"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  objects: true,
  objectsBrowser: true
};
exports.objectsBrowser = exports.objects = void 0;
var _circularObject = require("./objects/circularObject");
Object.keys(_circularObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _circularObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _circularObject[key];
    }
  });
});
var _deepReferenceObject = require("./objects/deepReferenceObject");
Object.keys(_deepReferenceObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deepReferenceObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deepReferenceObject[key];
    }
  });
});
var _domItem = require("./objects/domItem");
Object.keys(_domItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _domItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _domItem[key];
    }
  });
});
var _jsonDom = require("./objects/jsonDom");
Object.keys(_jsonDom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _jsonDom[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jsonDom[key];
    }
  });
});
var _linkedList = require("./objects/linkedList");
Object.keys(_linkedList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _linkedList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _linkedList[key];
    }
  });
});
var _multiReferenceObject = require("./objects/multiReferenceObject");
Object.keys(_multiReferenceObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _multiReferenceObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiReferenceObject[key];
    }
  });
});
var _nodeTree = require("./objects/nodeTree");
Object.keys(_nodeTree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _nodeTree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeTree[key];
    }
  });
});
/**
 * Some sample objects to use in tests.
 */

const objects = exports.objects = {
  circularObject: _circularObject.circularObject,
  deepReferenceObject: _deepReferenceObject.deepReferenceObject,
  domItem: _domItem.domItem,
  jsonDom: _jsonDom.jsonDom,
  linkedList: _linkedList.linkedList,
  multiReferenceObject: _multiReferenceObject.multiReferenceObject,
  nodeTree: _nodeTree.nodeTree
};
const objectsBrowser = exports.objectsBrowser = {
  circularObject: _circularObject.circularObject,
  deepReferenceObject: _deepReferenceObject.deepReferenceObject,
  domItem: _domItem.domItem,
  jsonDom: _jsonDom.jsonDom,
  linkedList: _linkedList.linkedList,
  multiReferenceObject: _multiReferenceObject.multiReferenceObject,
  nodeTree: _nodeTree.nodeTree
};
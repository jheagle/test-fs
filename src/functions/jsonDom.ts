import { jsonDomItem } from './domItem'

/**
 * Sample of jsonDom object containing an empty nested array and objects
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Array|Object>}
 */
export const jsonDom: jsonDomItem = {
  tagName: 'div',
  attributes: { style: {}, className: 'column' },
  element: null,
  eventListeners: {},
  parentItem: {},
  children: [],
  axis: 'x'
}

export default jsonDom

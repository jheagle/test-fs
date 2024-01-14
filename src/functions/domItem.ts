export type jsonDomItem = {
  name?: string,
  attributes?: { className?: string, style?: {} },
  axis?: 'x' | 'y' | 'z',
  parent?: jsonDomItem | null,
  children?: Array<jsonDomItem> | [],
  element?: Node | {} | null,
  eventListeners?: {},
  hasShip?: boolean,
  isHit?: boolean,
  parentItem?: {} | null,
  point?: {},
  tagName?: string,
}

/**
 * Sample of domItem child with nested child and optional details
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Array|Object>}
 */
export const domItem: Array<jsonDomItem> = [
  {
    attributes: { className: 'row', style: {} },
    axis: 'y',
    children: [
      {
        attributes: { style: {} },
        axis: 'x',
        children: [],
        element: {},
        eventListeners: {},
        hasShip: false,
        isHit: false,
        parentItem: {},
        point: {},
        tagName: 'div'
      }
    ],
    element: null,
    eventListeners: {},
    parentItem: {},
    tagName: 'div'
  }
]

export default domItem

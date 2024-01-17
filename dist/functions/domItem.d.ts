export type jsonDomItem = {
    name?: string;
    attributes?: {
        className?: string;
        style?: {};
    };
    axis?: 'x' | 'y' | 'z';
    parent?: jsonDomItem | null;
    children?: Array<jsonDomItem> | [];
    element?: Node | {} | null;
    eventListeners?: {};
    hasShip?: boolean;
    isHit?: boolean;
    parentItem?: {} | null;
    point?: {};
    tagName?: string;
};
/**
 * Sample of domItem child with nested child and optional details
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Array|Object>}
 */
export declare const domItem: Array<jsonDomItem>;
export default domItem;

/**
 * Sample object with deep references.
 * @memberOf module:test-fs
 * @type {Object.<string, string|number|Object>}
 */
export const deepReferenceObject: {
  object1: {
    name: string,
    object2: {
      age: number,
      array1: Array<string>,
    },
    array2: Array<number>
  },
  title: string,
  item: number,
} = {
  object1: {
    name: 'someName',
    object2: {
      age: 12,
      array1: [
        'someString',
        'anotherString'
      ]
    },
    array2: [
      89,
      32
    ]
  },
  title: 'Some Title',
  item: 45
}

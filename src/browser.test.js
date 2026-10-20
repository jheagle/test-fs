import * as browser from './browser'
import { debuggingBrowser } from './functions/debugging'
import { evaluateBrowser } from './functions/evaluate'
import { objectsBrowser } from './functions/objects'

describe('browser entry', () => {
  test('exposes only the browser-safe groups', () =>
    expect(Object.keys(browser).sort()).toEqual(['debugging', 'evaluate', 'objects'])
  )

  test('each group matches its browser grouping', () => {
    expect(browser.debugging).toEqual(debuggingBrowser)
    expect(browser.evaluate).toEqual(evaluateBrowser)
    expect(browser.objects).toEqual(objectsBrowser)
  })
})

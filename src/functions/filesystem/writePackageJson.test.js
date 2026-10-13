import { writePackageJson } from './writePackageJson'
import { removeDirectory } from './removeDirectory'
import { readFileSync } from 'fs'

const tempDir = 'test-write-package-json'

afterEach(() => removeDirectory(tempDir))

describe('writePackageJson', () => {
  test('writes a package.json with the given fields, creating missing directories', () => {
    writePackageJson(`${tempDir}/nested`, { name: 'example', version: '1.0.0' })
    const written = JSON.parse(readFileSync(`${tempDir}/nested/package.json`).toString())
    expect(written).toEqual({ name: 'example', version: '1.0.0' })
  })

  test('formats output with a consistent 2-space indent regardless of caller formatting expectations', () => {
    writePackageJson(tempDir, { name: 'example' })
    const content = readFileSync(`${tempDir}/package.json`).toString()
    expect(content).toBe('{\n  "name": "example"\n}\n')
  })
})

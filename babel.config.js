module.exports = {
  plugins: [
    // Babel 8 removed preset-env's useBuiltIns/corejs options; the same polyfill injection, as its own plugin
    ['babel-plugin-polyfill-corejs3', { method: 'usage-global', version: '3.6', proposals: true }]
  ],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        // Babel 8 compiles to ES modules by default; dist/*.js stays CommonJS
        modules: 'commonjs',
        // Pinned (instead of 'current') so the compiled dist does not depend on the Node version doing the build (Node 24
        // drops the core-js polyfills Node 20 gets). Raise it deliberately.
        targets: { node: '20.6' }
      }
    ]
  ]
}

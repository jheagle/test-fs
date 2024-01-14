module.exports = {
  plugins: ['plugins/markdown'],
  source: {
    include: 'dist/cjs',
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '((^|\\/|\\\\)_|.+\\.(test|min)\\..*)'
  },
}

module.exports = {
  plugins: ['plugins/markdown'],
  source: {
    include: 'dist',
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '((^|\\/|\\\\)_|.+\\.(test|min)\\..*)'
  },
}

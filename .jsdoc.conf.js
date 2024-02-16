module.exports = {
  plugins: ['plugins/markdown'],
  source: {
    include: ['dist', 'dist/functions'],
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '((^|\\/|\\\\)_|.+\\.(test|min)\\..*)'
  },
}

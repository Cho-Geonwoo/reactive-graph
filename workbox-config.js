module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,ico,html,png,txt,css,js}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'build/service-worker.js',
};

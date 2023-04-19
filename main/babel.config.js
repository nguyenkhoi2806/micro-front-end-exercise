module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    "presets": [
      "@babel/preset-env",
      ['@babel/preset-react', {
        development: !api.env('production'),
        runtime: 'automatic'
      }],
      "@babel/preset-typescript"
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ]
    ]
  }
};

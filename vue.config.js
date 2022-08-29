const webpack = require('webpack');

const p = require('./package.json');
console.log(p.version);
module.exports = {
  // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          'APPLICATION_VERSION': JSON.stringify(p.version),
        }),
      ],
    };
  },
  'transpileDependencies': [
    'vuetify',
  ],
};

const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = function override(config, env) {
  //process.env.AUTH_URL
  if (env === 'production') {
    config.devtool = false;
  }

  config = rewireDefinePlugin(config, env, {
    'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL)
  });

  return config;
};

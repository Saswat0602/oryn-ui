const baseConfig = require('./tailwind.config.js');

module.exports = {
  ...baseConfig,
  corePlugins: {
    ...baseConfig.corePlugins,
    preflight: false,
  },
};

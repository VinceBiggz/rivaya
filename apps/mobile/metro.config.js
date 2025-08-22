const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.enableSymlinks = true;
config.resolver.alias = {
  '@rivaya/shared': path.resolve(__dirname, '../shared/src'),
};

module.exports = config;

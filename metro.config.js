// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Allow Firebase JS SDK to work correctly in React Native
config.resolver.assetExts.push('cjs');

module.exports = config;

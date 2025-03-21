// Included to try to suppress deprecation warnings for punycode
// https://github.com/mathiasbynens/punycode.js/issues/137
const moduleAlias = require("module-alias");
moduleAlias.addAlias("punycode", "punycode/");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

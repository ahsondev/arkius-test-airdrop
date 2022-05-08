const config = require('dotenv').config().parsed

module.exports = {
  ...config,
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  PORT: 4000
}

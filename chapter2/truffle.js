// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var Shh = require('web3-shh');

module.exports = {
  networks: {
    development: {
//      host: 'localhost',
      host: '192.168.0.178',
      port: 8545,
      network_id: '*',
      gas: 6600000
    }
  }
}

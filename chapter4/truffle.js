// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '192.168.0.173',
//        host: '127.0.0.1',
      port: 8545,
        gas: 4700000,
      network_id: '*' // Match any network id
    }
  }
}

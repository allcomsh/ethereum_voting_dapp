// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var ENS = require('ethereum-ens');

module.exports = {
  networks: {
    development: {
//      host: 'i.mailwalk.com',
 //     host: '192.168.0.173',
//      host: '192.168.0.174',
        host: '192.168.0.178',
      port: 8545,
  //      port: 8347,
//      gas: 6700000,
      gas: 4700000,
      network_id: '*' // Match any network id
    },
    ropsten: {
  //    host: 'localhost',
      host: '192.168.0.173',
      port: 8545,
      gas: 4700000,
        network_id: '*' // Match any network id
//      network_id: '3' // Match any network id
    },
    // kovan: {
    //   host: 'localhost',
    //   port: 8545,
    //   gas: 4700000,
    //   network_id: '5' // Match any network id
    // }
  }
}

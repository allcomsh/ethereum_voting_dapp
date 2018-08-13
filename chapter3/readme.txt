1. accounts
    $ truffle console
    truffle(default)> web3.personal.newAccount('verystrongpassword')
    '0x2d1025e58b08fdf25f860fedecf4af9a66c87def'
    truffle(default)> web3.eth.getBalance(web3.eth.accounts[0])
    { [String: '0'] s: 1, e: 0, c: [ 0 ] }
    truffle(default)> web3.personal.unlockAccount(web3.eth.accounts[0],'verystrongpassword',15000)
    // Replace 'verystrongpassword' with a good strong password.
    // The account is locked by default, make sure to unlock it before using the account for deploying and interacting with the blockchain.
2. apply eth at
    https://faucet.rinkeby.io/
    copy and paste witter post
    https://twitter.com/weilish/status/1028583308223897600
3. resources
    https://github.com/ethereum/go-ethereum

4. fast mode
    geth --rinkeby --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
5. light mode
    geth --rinkeby --syncmode "light" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
    light mode save space but still take long time to sync for first time
    truffle(development)> web3.eth.syncing
    { currentBlock: 456768,
      highestBlock: 2801389,
      knownStates: 0,
      pulledStates: 0,
      startingBlock: 0 }
    getBalance will not return until syncing is not false

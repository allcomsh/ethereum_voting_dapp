https://github.com/allcomsh/ethereum_voting_dapp

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
    geth --rinkeby --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --datadir /data/ethereum/.ethereum
5. light mode
    geth --rinkeby --syncmode "light" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --datadir /data/ethereum/.ethereum
    light mode save space but still take long time to sync for first time
    truffle(development)> web3.eth.syncing
    { currentBlock: 456768,
      highestBlock: 2801389,
      knownStates: 0,
      pulledStates: 0,
      startingBlock: 0 }
    getBalance will not return until syncing is not false

6. install geth on centos
http://blog.bradlucas.com/posts/2017-07-18-ethereum-installing-geth-on-centos/
Building

$  sudo yum install golang
$  sudo yum install gmp-devel
$  git clone https://github.com/ethereum/go-ethereum
$  cd go-ethereum/
$  make geth
$  ls -al  build/bin/geth

Running

$ ./go-ethereum/build/bin/geth
7. firewall
    firewall-cmd --get-active-zones
    firewall-cmd --zone=public --add-port=8545/tcp --permanent
    firewall-cmd --reload

8. node and npm
    sudo yum install epel-release
    sudo yum install nodejs
    sudo npm install -g truffle
    npm install

9. ens
http://docs.ens.domains/en/latest/introduction.html
ENS is also deployed on the Rinkeby testnet at 0xe7410170f87102df0055eb195163a03b7f2bff4a, where only the .test top level domain is supported.
If you want to use Rinkeby, you'll need to change in ensutils-testnet.js:

contract address: 0xe7410170f87102df0055eb195163a03b7f2bff4a (line 220)
publicResolver address: 0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc (line 1314)

web3.personal.unlockAccount(web3.personal.listAccounts[0],"<password>", 15000) // 15,000 seconds
new Date(testRegistrar.expiryTimes(web3.sha3('myname')).toNumber() * 1000)

> testRegistrar.register(web3.sha3('liwei'), eth.accounts[0], {from: eth.accounts[0]})
"0x4b3eae273d8f92d9bcbd4db1d67497d5a3fc8d0ce4fec2ae7b19c20007955a60"
> testRegistrar.expiryTimes(web3.sha3('liwei'))
1536573428
> ens.owner(namehash('liwei.test'))
"0xee95143def53f4b012f25d6f1609f969edbacb89"
> eth.accounts
["0xee95143def53f4b012f25d6f1609f969edbacb89"]
subdomain owner
ens.setSubnodeOwner(namehas('allcom.test'),web3.sha3('zhujuan'),eth.accounts[2],{from:eth.accounts[0]});

REGISTER
input username: liwei password
0. check if name available
1. eth.newAccount
2. testRegistrar.register(username,account address, {from:system account})
3. give new account some token
4. bind email address

LOGIN
input username: liwei password:
1. get address: ens.owner(namehash('liwei.test'))
2. unlockAccount(address,password,15000);
login if success

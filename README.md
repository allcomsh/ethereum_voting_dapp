## Modify Chapter 3 to test on rinkeby 
###prepare
1. get eth on rinkeby test network
https://faucet.rinkeby.io/
###development prepare, install truffle, suppose you have installed the basic javascript enironment, npm and webpack/webpack-dev-server 
###only need to unlock the account, don't need to do truffle migrate
$npm install -g truffle
$truffle console
truffle(development)>web3.personal.unlockAccount(web3.eth.accounts[0], 'askmeforpassword')

###
$cd chapter3
$npm install
$webpack-dev-server

# Ethereum Voting Dapp
Simple Ethereum Voting dapp using Truffle framework

## Usage
The below blog posts explain each chapter in detail:

Chapter 1: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2#.yqxqj0hff

Chapter 2: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f

Chapter 3: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-3-331c2712c9df#.ldky416p7

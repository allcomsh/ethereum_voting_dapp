var Voting = artifacts.require("./Voting.sol");
const ENS = artifacts.require("@ensdomains/ens/ENSRegistry.sol");
const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar.sol");
const PublicResolver = artifacts.require("@ensdomains/ens/PublicResolver.sol");
const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar.sol");
const namehash=require('eth-ens-namehash');

module.exports = function(deployer) {
  deployer.deploy(Voting, 1000, web3.toWei('0.1', 'ether'), ['Rama', 'Nick', 'Jose']);
    let name = 'allcom';
    let tld = 'callt.test';
    let owner = web3.eth.accounts[0];
    deployer.deploy(ENS)
        .then(()=>{
            return deployer.deploy(PublicResolver,ENS.address);
        })
        .then(()=>{
            console.log("ENS.address",ENS.address);
            console.log("ENS.address",ENS.address);
            //var testRegistrar = fifsRegistrarContract.at(ens.owner(namehash('test')));

            return deployer.deploy(FIFSRegistrar,namehash.hash('test'),PublicResolver.address);
        })
        .then(()=>{
            return deployer.deploy(ReverseRegistrar,ENS.address,PublicResolver.address);
        })
        .then(()=>{
            console.log('setSubnodeOwner:'+ENS.address,tld);
            return ENS.at(ENS.address)
            // eth
                .setSubnodeOwner(0,web3.sha3(tld),owner,{from:owner});
        })
        .then(()=>{
            console.log('setSubnodeOwner:'+ENS.address,owner);
            return ENS.at(ENS.address)
            // reverse
                .setSubnodeOwner(0,web3.sha3('reverse'),owner,{from:owner});
        })
        .then(()=>{
            console.log('setSubnodeOwner:'+ReverseRegistrar.address,owner);
            return ENS.at(ENS.address)
            // addr.reverse
                .setSubnodeOwner(namehash.hash('reverse'),web3.sha3('addr'),ReverseRegistrar.address,{from:owner});
        })
        .then(()=>{
            console.log('setSubnodeOwner:'+ENS.address,owner);
            return ENS.at(ENS.address)
            // reverse
                .setSubnodeOwner(0,web3.sha3('callt'),owner,{from:owner});
        })
        .then(()=>{
            console.log('setSubnodeOwner:'+tld,owner);
            return ENS.at(ENS.address)
            // addr.reverse
                .setSubnodeOwner(namehash.hash('callt'),web3.sha3('admin'),FIFSRegistrar.address,{from:owner});
        })
};

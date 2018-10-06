var Voting = artifacts.require("./Voting.sol");
const ENS = artifacts.require("@ensdomains/ens/ENSRegistry.sol");
const ENSrinkeby = {address:"0xe7410170f87102df0055eb195163a03b7f2bff4a"};
const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar.sol");
const PublicResolver = artifacts.require("@ensdomains/ens/PublicResolver.sol");
const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar.sol");
const namehash=require('eth-ens-namehash');

module.exports = function(deployer) {
  deployer.deploy(Voting, 1000, web3.toWei('0.1', 'ether'), ['Rama', 'Nick', 'Jose']);
    let name = 'allcom';
    let tld = 'callt.test';
    let owner = web3.eth.accounts[0];
    let rinkebyens='0xe7410170f87102df0055eb195163a03b7f2bff4a';
    let rinkebyresolver='0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc';
    deployer.deploy(ENS)
        .then(()=>{
            return deployer.deploy(PublicResolver,ENSrinkeby.address);
        })
        .then(()=>{
            console.log("ENS.address",ENS.address);
//            console.log("ENS.address",ENS.address);
            //var testRegistrar = fifsRegistrarContract.at(ens.owner(namehash('test')));
                return deployer.deploy(FIFSRegistrar,ENSrinkeby.address,PublicResolver.address);

//            return deployer.deploy(FIFSRegistrar,rinkebyens,rinkebyresolver);
        })
        // .then(()=>{
        //     return deployer.deploy(FIFSRegistrar,ENS.address,PublicResolver.address);
        // })
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

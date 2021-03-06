'use strict';

// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
//import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ENSArtifacts from '../../build/contracts/ENSRegistry.json';
import PublicResolver from '../../build/contracts/PublicResolver.json';
import ReverseRegistrar from '../../build/contracts/ReverseRegistrar.json';
import FIFSRegistrar from '../../build/contracts/FIFSRegistrar.json';
import TruffleContract from 'truffle-contract'
var ENSContract = TruffleContract(ENSArtifacts);
const publicResolver = TruffleContract(PublicResolver);
var reverseRegistrar = TruffleContract(ReverseRegistrar);
var fifsRegistrar = TruffleContract(FIFSRegistrar);
const namehash=require('eth-ens-namehash');

var ENS = require('ethereum-ens');
var Web3 = require('web3');

var provider;// = new Web3.providers.HttpProvider();
var ens;// = new ENS(provider);

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import voting_artifacts from '../../build/contracts/Voting.json'
//import voting_artifacts from './Voting.json'

var Voting = contract(voting_artifacts);

//var contractid = '0x7b2ed2d8c914c55250e8b03276415a2b1dc44d0a';
var contractid='0xA3b7045Df02C0745Edd62180dA46e2b2BCD8807f';
//var contractid='0xe032915da7639f412887b76c34b97c53ad087cb3';
//var contractid='0x0316fb4559240e57b0a7dfbb7eedc96e05d24edc';
//var contractid='0x8353128d9d5501a8d4dbc4338c427567927efeef';
//var contractid='0x61299865f0e4b67fdeef5cfda159199fa2c8aa63';
let candidates = {}
//const nodefortest="http://i.mailwalk.com:8545";
// const nodefortest="http://192.168.0.174:8545";
// const passwordfortest="verystrongpassword";
const nodefortest="http://192.168.0.178:8545";
const passwordfortest="allcompass";
// const nodefortest="http://192.168.0.173:8545";
// const passwordfortest="allcompass";
let tokenPrice = null;

window.voteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

  /* Voting.deployed() returns an instance of the contract. Every call
   * in Truffle returns a promise which is why we have used then()
   * everywhere we have a transaction call
   */
  Voting.deployed().then(function(contractInstance) {
//  Voting.at(contractid).then(function(contractInstance) {
    contractInstance.voteForCandidate(candidateName, voteTokens, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
      let div_id = candidates[candidateName];
      return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
        $("#" + div_id).html(v.toString());
        $("#msg").html("");
      });
    });
  });
}

/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

window.buyTokens = function() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  console.log("tokenstobuy:",price);
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");
    web3.personal.unlockAccount(web3.eth.accounts[0],passwordfortest,15000,function(error,result){
      console.log(error,result);
//        Voting.deployed().then(function(contractInstance) {
        Voting.at(contractid).then(function(contractInstance) {
            contractInstance.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}).then(function(v) {
                $("#buy-msg").html("");
                web3.eth.getBalance(contractInstance.address, function(error, result) {
                    $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
                });
            })
        });
        populateTokenData();
    })

//  Voting.deployed().then(function(contractInstance) {

}

window.lookupVoterInfo = function() {
  let address = $("#voter-info").val();
  Voting.deployed().then(function(contractInstance) {
//  Voting.at(contractid).then(function(contractInstance) {
    contractInstance.voterDetails.call(address).then(function(v) {
      $("#tokens-bought").html("Total Tokens bought: " + v[0].toString());
        $("#myaccount-token").html("Total Tokens bought: " + v[0].toString());
      let votesPerCandidate = v[1];
      $("#votes-cast").empty();
      $("#votes-cast").append("Votes cast per candidate: <br>");
      let allCandidates = Object.keys(candidates);
      for(let i=0; i < allCandidates.length; i++) {
        $("#votes-cast").append(allCandidates[i] + ": " + votesPerCandidate[i] + "<br>");
      }
    });
  });
}
window.transferFund = function() {
  let address = $("#transfer-info").val();
  if (address==null || address.length==0)
      address=web3.eth.accounts[1];
  console.log("Transfered to "+address);
//    web3.personal.unlockAccount(web3.eth.accounts[0],'allcompass',15000,function(error,result) {
   web3.personal.unlockAccount(web3.eth.accounts[0],passwordfortest,150000,function(error,result) {
//        console.log(error, result);
//        Voting.deployed().then(function (contractInstance) {
 Voting.at(contractid, {gasLimit: "90000"}).then(function(contractInstance) {
            contractInstance.transferTo(address,{value: 0, from: web3.eth.accounts[0]}).then(function (v) {
//            contractInstance.transferTo.call(address,{value: 0, from: web3.eth.accounts[0]}).then(function (v) {
//                contractInstance.widthdraw({value: 0, from: web3.eth.accounts[0]}).then(function (v) {
//                contractInstance.transferTo(address).then(function (v) {
                 console.log(address+"Transfered executed: "+v, contractInstance);
                 populateTokenData();
             });
         });
   });
}


/* Instead of hardcoding the candidates hash, we now fetch the candidate list from
 * the blockchain and populate the array. Once we fetch the candidates, we setup the
 * table in the UI with all the candidates and the votes they have received.
 */
function populateCandidates() {
//  Voting.deployed().then(function(contractInstance) {
  Voting.at(contractid).then(function(contractInstance) {
    contractInstance.allCandidates.call().then(function(candidateArray) {
      for(let i=0; i < candidateArray.length; i++) {
        /* We store the candidate names as bytes32 on the blockchain. We use the
         * handy toUtf8 method to convert from bytes32 to string
         */
        candidates[web3.toUtf8(candidateArray[i])] = "candidate-" + i;
      }
      setupCandidateRows();
      populateCandidateVotes();
      populateTokenData();
    });
  });
    $("#node").html(nodefortest);
    $("#contract").html(contractid);
    // if (web3.eth && web3.eth.accounts && web3.eth.accounts.length>0) {
    //     $("#myaccount").html(web3.eth.accounts[0]);
    //     web3.eth.getBalance(web3.eth.accounts[0], function (error, result) {
    //         $("#myaccount-balance").html(web3.fromWei(result.toString()) + " Ether");
    //     });
    // }
}

function populateCandidateVotes() {
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
//    Voting.deployed().then(function(contractInstance) {
    Voting.at(contractid).then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + candidates[name]).html(v.toString());
      });
    });
  }
}

function setupCandidateRows() {
  Object.keys(candidates).forEach(function (candidate) {
    $("#candidate-rows").append("<tr><td>" + candidate + "</td><td id='" + candidates[candidate] + "'></td></tr>");
  });
}

/* Fetch the total tokens, tokens available for sale and the price of
 * each token and display in the UI
 */
function populateTokenData() {
//  Voting.deployed().then(function(contractInstance) {
    Voting.at(contractid).then(function(contractInstance) {
    contractInstance.totalTokens().then(function(v) {
      $("#tokens-total").html(v.toString());
    });
    contractInstance.tokensSold.call().then(function(v) {
      $("#tokens-sold").html(v.toString());
    });
    contractInstance.tokenPrice().then(function(v) {
      tokenPrice = parseFloat(web3.fromWei(v.toString()));
      $("#token-cost").html(tokenPrice + " Ether");
    });
    web3.eth.getBalance(contractInstance.address, function(error, result) {
      $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
    });
      contractInstance.balance1().then(function(v) {
          tokenPrice = parseFloat(web3.fromWei(v.toString()));
          $("#contract-balance1").html(tokenPrice + " Ether");
      });
      contractInstance.balance2().then(function(v) {
          tokenPrice = parseFloat(web3.fromWei(v.toString()));
          $("#contract-balance2").html(tokenPrice + " Ether");
      });
  });
}
function namehash1(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

function populateENS() {
    ENSContract.setProvider(web3.currentProvider)
    publicResolver.setProvider(web3.currentProvider)
    reverseRegistrar.setProvider(web3.currentProvider)
    fifsRegistrar.setProvider(web3.currentProvider)
    const gens = ens;
//    publicResolver.at("0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc").then(function(contractInstance) {
//     publicResolver.deployed().then(function(contractInstance) {
//         const account = "0xee95143def53f4b012f25d6f1609f969edbacb89";//web3.eth.accounts[0]
//         const publicresolver = contractInstance;
//         const address = "0x29fa9174af22ef0fdefffeafee4983dc540ad79a";
//         console.log("hash1:",namehash1('calltt1.test'));
//         console.log("hash:",namehash.hash('calltt1.test'));
//         ens.setResolver(namehash1('calltt1.test'), publicresolver.address, {from: account}).then(e => {
//             console.log('setResolver:', e);
//             publicresolver.setAddr(namehash1('calltt1.test'), address, {from: account}).then(e => {
//                 console.log('setAddr', e);
//                 ens.resolver('calltt1.test').addr().then(function (addr) {
//                     console.log('check callt.test:', addr)
//                 });
//             });
//         });
//     });
//     return;
    let rinkebyens='0xe7410170f87102df0055eb195163a03b7f2bff4a';
    ENSContract.at(rinkebyens).then(function(contractInstance) {
//    ENSContract.deployed().then(function(contractInstance) {
        const myens=contractInstance;
        // var address = contractInstance.resolver('callt.test').addr().then(function (addr) {
        //     console.log('allcomsh.test:', addr)
        // });
        // address = contractInstance.resolver('allcomsh.test').addr().then(function (addr) {
        //     console.log('allcomsh.test:', addr)
        // });
//        fifsRegistrar.at(rinkebyens).then(function (contractInstance) {
//        fifsRegistrar.at(ens.owner(namehash.hash('test'))).then(function (contractInstance) {
        fifsRegistrar.deployed().then(function (contractInstance) {
            const account = "0xee95143def53f4b012f25d6f1609f969edbacb89";//web3.eth.accounts[0]
            const fifs=contractInstance;
            fifs.register(web3.sha3('calltt'), account, {from: account}).then(e=>{
                console.log('register',e)
//                0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc
                publicResolver.at("0x5d20cf83cb385e06d2f2a892f9322cd4933eacdc").then(function(contractInstance) {
//                publicResolver.deployed().then(function(contractInstance) {
                const publicresolver = contractInstance;
                const name='a'+Math.round(Math.random()*10000);//"second";
//                const address=publicresolver.address;
    //        const address=web3.eth.accounts[0];
                const address=  "0x29fa9174af22ef0fdefffeafee4983dc540ad79a";
                console.log(name+'.allcom.test',namehash.hash('allcom.test'));
                                  myens.setSubnodeOwner(namehash.hash('allcom.test'), web3.sha3(name), account, {from:account }).then(e=>{
                                      console.log('subnodeOwner:'+name+'.allcom.test',e)
                                      myens.setResolver(namehash.hash(name+'.allcom.test'), publicresolver.address, {from:account}).then(e=> {
                                              console.log('setResolver',e);
                                              publicresolver.setAddr(namehash.hash(name+'.allcom.test'), account, {from: account}).then(e=>{
                                                  console.log('setAddr',e);
                                                  ens.resolver(name+'.allcom.test').addr().then(function (addr) {
                                                      console.log('check '+name+'.callt.test:', addr)
                                                  });
                                              });
                                          }
                                      );
                                  });
 //               myens.setSubnodeOwner(namehash('allcomsh.test'), web3.sha3(name), account, {from:account });
               myens.setSubnodeOwner(namehash.hash('callt.test'), web3.sha3(name), account, {from:account });
                myens.setResolver(namehash.hash(name+'.callt.test'), publicresolver.address, {from:account});
                publicresolver.setAddr(namehash.hash(name+'.callt.test'), address, {from: account});
            });
            })
        })

        });

}

$( document ).ready(function() {
    var options = {timeout: 20000,headers: [{name: 'Access-Control-Allow-Origin', value: '*'},{name:'supports_credentials',value:true} ]};
    if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
//    window.web3 = new Web3(web3.currentProvider);
//    window.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.10:8545"));
    window.web3 = new Web3(new Web3.providers.HttpProvider(nodefortest),options);
  } else {
    console.warn("No web3 detected. Falling back to http://"+nodefortest+":8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//    window.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.10:8545"));
    window.web3 = new Web3(new Web3.providers.HttpProvider(nodefortest,options));
  }

  Voting.setProvider(web3.currentProvider);
  populateCandidates();

    provider = new Web3.providers.HttpProvider(nodefortest);
//    provider = new Web3.providers.HttpProvider();
    //provider=web3.currentProvider;
    console.log(provider)
    provider = window.web3.currentProvider;
 ens = new ENS(provider);
    populateENS();
// console.log(ens.owner(namehash('lxh.liwei.test')));
    if (ens) {
        console.log('ens',ens);
//       console.log('ens resolve',ens.resolver('liwei.test'));
        var address = ens.resolver('allcomsh.test').addr().then(function (addr) {
            console.log('allcomsh.test:', addr)
        });
        var address1 = ens.resolver('foo.allcomsh.test').addr().then(function (addr) {
            console.log('foo.allcomsh.test:', addr)
        });
        ens.resolver('liwang.allcomsh.test').addr().then(function (addr) {
            console.log('liwang.allcomsh.test:', addr)
        });
        ens.resolver('lxh.allcomsh.test').addr().then(function (addr) {
            console.log('lxh.allcomsh.test:', addr)
        });
        address = ens.resolver('second.allcom.test').addr().then(function (addr) {
            console.log('second.allcom.test:', addr)
        });
    }
});

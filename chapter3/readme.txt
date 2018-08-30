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

development tools
git
sudo yum install git
sudo yum groupinstall "Development Tools"
sudo yum install gettext-devel openssl-devel perl-CPAN perl-devel zlib-devel

os
yum -y install epel-release
if yum fails update the repo according to the following:
https://mirrors.163.com/.help/centos.html
1. 首先备份/etc/yum.repos.d/CentOS-Base.repo
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
2. wget https://mirrors.163.com/.help/CentOS7-Base-163.repo
3. yum clean all
   yum makecache
   yum install golang

https://github.com/rofl0r/proxychains-ng
git clone https://github.com/rofl0r/proxychains-ng
cd proxychains-ng
./configure --prefix=/usr --sysconfdir=/etc
make
make install
make install-config
cd .. && rm -rf proxychains-ng

Eventually I can withdraw money from contract
withdraw ether from contract finally works,
1. first the constructor of sol should be payable, the withdraw function is not payable
2. and then the js to submit the call of transferTo or withdraw should include from which account and value, gas limit etc.
3. use https://remix.ethereum.org/ to debug sol program against testnet through local Web3 provider http://localhost:8545, which is a geth node running in light model


swarm
https://swarm-guide.readthedocs.io/en/latest/installation.html
[liwei@osdnode173 go-ethereum]$ swarm --bzzaccount 0bb484ad60c7d2b5b3e9961e495534124af0a430
swarm --ens-api /data/ethereum/.ethereum/geth.ipc --bzzaccount 0bb484ad60c7d2b5b3e9961e495534124af0a430 --datadir /data/ethereum/.ethereum  --httpaddr 0.0.0.0
upload a file
curl -H "Content-Type: image/jpeg" --data-binary @testup.jpg http://192.168.0.173:8500/bzz:/

http://192.168.0.173:8500/bzz:/4123cc6b82da4232e0f0c556467d1c78b73aac5361db63b1232e1adad06b9e21/
http://192.168.0.173:8500/bzz:/743c8ebd370454c3ee24a050f950df5690fc8436d6647ede6bea82f39528ae8c/

192.168.0.178
[liwei@localhost go-ethereum]$ geth --datadir /data/ethereum/.ropsten account new
INFO [08-22|11:52:42.143] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {9b02efa4bc76a92d27045b8dfaf16924743aa4c4}

[liwei@localhost go-ethereum]$ swarm --datadir /data/ethereum/.ropsten --bzzaccount 9b02efa4bc76a92d27045b8dfaf16924743aa4c4
INFO [08-22|11:54:41.147] Maximum peer count                       ETH=25 LES=0 total=25
Unlocking swarm account 0x9b02eFa4Bc76a92d27045B8DFAf16924743AA4C4 [1/3]
Passphrase:
INFO [08-22|11:54:47.030] Starting peer-to-peer node               instance=swarm/v0.3.2/linux-amd64/go1.9.4
INFO [08-22|11:54:47.206] Starting P2P networking
INFO [08-22|11:54:49.433] UDP listener up                          self=enode://277ffa9812ca244dca3b88749b95713e742fae623e3885991c9a6b01829d92614454f5169454e14d47f705d979c35bd24a67a73ac424b09a5cd5e94af7781a46@[::]:30399
INFO [08-22|11:54:49.434] Updated bzz local addr                   oaddr=1b5967ffcd3fedfc87619bb507ceabdce1419efd68f8a72dd4de0c2e00aa0ec7 uaddr=enode://277ffa9812ca244dca3b88749b95713e742fae623e3885991c9a6b01829d92614454f5169454e14d47f705d979c35bd24a67a73ac424b09a5cd5e94af7781a46@[::]:30399
INFO [08-22|11:54:49.434] Starting bzz service
INFO [08-22|11:54:49.434] Starting hive                            baseaddr=1b5967ff
INFO [08-22|11:54:49.434] Detected an existing store. trying to load peers
INFO [08-22|11:54:49.434] hive 1b5967ff: no persisted peers found
INFO [08-22|11:54:49.434] Swarm network started                    bzzaddr=1b5967ffcd3fedfc87619bb507ceabdce1419efd68f8a72dd4de0c2e00aa0ec7
INFO [08-22|11:54:49.434] Started Pss
INFO [08-22|11:54:49.434] Loaded EC keys                           pubkey=0x0453f24a2f24e784086f5711df975aa3d38c67872849185f4170b47532ad3e0be3a6b341f29e62e3f2eb2722ba1afe7cdb6d5ec42a4c38a2cab25bad14fb17b1c7 secp256=0x0353f24a2f24e784086f5711df975aa3d38c67872849185f4170b47532ad3e0be3
INFO [08-22|11:54:49.435] Streamer started
INFO [08-22|11:54:49.439] RLPx listener up                         self=enode://277ffa9812ca244dca3b88749b95713e742fae623e3885991c9a6b01829d92614454f5169454e14d47f705d979c35bd24a67a73ac424b09a5cd5e94af7781a46@[::]:30399
INFO [08-22|11:54:49.441] IPC endpoint opened                      url=/data/ethereum/.ropsten/bzzd.ipc

sudo firewall-cmd --zone=public --add-port=8500/tcp --permanent

The default number of chunks of Swarm is 5M, about 20-25GB, change it to 500,000 or even smaller 100,000 for testing
–store.size value	SWARM_STORE_CAPACITY	5000000	Number of chunks (5M is roughly 20-25GB) (default 5000000)]

whisper chat
var kId = web3.shh.newKeyPair();
web3.shh.newMessageFilter(
    {privateKeyID:kId},
    function(err, res) {console.log(web3.toUtf8(res.payload))
    //function(err, res) {console.log(web3.toUtf8(res.payload) + ‘,’ + JSON.stringify(res) )}); //You can also combine it with complete res string.
});
web3.shh.getPublicKey(kId) //returns PUBLIC_KEY_OF_THE_RECEIVER
On the sender node:

web3.shh.post({
  pubKey: 'PUBLIC_KEY_OF_THE_RECEIVER',
  ttl: 7,
  topic: '0x07678231',
  powTarget: 2.01,
  powTime: 2,
  payload: web3.fromAscii("Hello there!")
  });

var kid=web3.shh.newKeyPair()
web3.shh.newMessageFilter({privateKeyID:kid},function(err,res){console.log(web3.toUtf8(res.payload))});
var ipub=web3.shh.getPublicKey(kid);
web3.shh.post({pubKey:ipub,ttl:7,topic:'0x07678231',powTarget:2.01,powTime:2,payLoad:web3.fromAscii('Hello blockchain')})

web3.shh.post({pubKey:'0x049316da3e7a10bb3a13c31e6ceb4fea8bfeeb3a09039aa615e6e26dd1b9757418502a0b8c1c7f87f37a4eb417af14bc95a55eae8e4a4adc2593c8c0b2c9278c05',ttl:7,topic:'0x07678231',powTarget:2.01,powTime:2,payLoad:web3.fromAscii('Hello blockchain')})
net.peerCount

if post in one node and receive in another node
#1 node
> admin.nodeInfo.enode
"enode://999afc11c41b97362e893e053386e87af9ad7f1e26a8cf005c94a639a297e16963de430903c74a766ccb3107a7de22ae60bfc2ed8c18f2ef5761d9f0b8967ea4@[::]:30303"
#2 node
> admin.addPeer('enode://999afc11c41b97362e893e053386e87af9ad7f1e26a8cf005c94a639a297e16963de430903c74a766ccb3107a7de22ae60bfc2ed8c18f2ef5761d9f0b8967ea4@192.168.0.174:30303')

https://ethereum.stackexchange.com/questions/24338/looking-for-a-working-whisper-example

web3.fromWei(eth.getBalance(eth.accounts[0]))

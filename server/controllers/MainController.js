const Web3 = require('web3');
const contractConfig = require('../../src/contracts/config.json');
const contractAbi = require('../../src/contracts/ATNFT.json');
const config = require('../config');

async function requestAsset(req, res) {
  try {
    const {address, membership} = req.body;
    const web3 = new Web3(config.rpcUrl);
    const contract = new web3.eth.Contract(
      contractAbi,
      contractConfig.contractAddress
    );
    
    const account = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);
    const assets = await contract.methods.ownedTokens(account.address).call();
    console.log(assets);
    for (let i = 0; i < assets.length; i++) {
      if (Math.floor(assets[i] / 10) === membership) {
        const transaction = {
          from: account.address,
          to: contractConfig.contractAddress, // faucet address to return eth
          data: contract.methods.transferFrom(account.address, address, assets[i]).encodeABI(),
          gas: 3000000,
          maxPriorityFeePerGas: 1000000108,
        };
    
        const signedTx = await web3.eth.accounts.signTransaction(
          transaction,
          config.PRIVATE_KEY
        );
    
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ tokenId: assets[i] });
        return;
      }
    }

    res.status(200).json({ msg: 'No more tokens' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function setBaseUri(req, res) {
  try {
    const web3 = new Web3(config.rpcUrl);
    const contract = new web3.eth.Contract(
      contractAbi,
      contractConfig.contractAddress
    );
    const account = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);

    const transaction = {
      from: account.address,
      to: contractConfig.contractAddress, // faucet address to return eth
      data: contract.methods.setBaseUri(req.body.baseUri).encodeABI(),
      gas: 3000000,
      maxPriorityFeePerGas: 1000000108,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      config.PRIVATE_KEY
    );

    await 
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ baseUri: req.body.baseUri });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function mint(req, res) {
  try {
    const web3 = new Web3(config.rpcUrl);
    const contract = new web3.eth.Contract(
      contractAbi,
      contractConfig.contractAddress
    );
    const account = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);

    const transaction = {
      from: account.address,
      to: contractConfig.contractAddress, // faucet address to return eth
      data: contract.methods.mint(30).encodeABI(),
      gas: 3000000,
      maxPriorityFeePerGas: 1000000108,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      config.PRIVATE_KEY
    );
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ msg: 'minted' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Server Error' });
  }
}

module.exports = {
  requestAsset,
  setBaseUri,
  mint,
};

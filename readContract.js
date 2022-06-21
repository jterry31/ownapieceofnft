function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
// Credentials

const Web3 = require('web3');

// mainnet
//const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')

const parcelAbi = require('./src/config/abi/parcelNFT.json')
const parcelContract = "0x90C56eaBCFaA74b3567b34cF5e91FCeEd8E7E1Fe"

const marketplaceAbi = require('./src/config/abi/marketplace.json')
const marketplaceContract = "0xD1dc49Fb0C8BD2DBEb50356Ea91bf0aceF370cD5"

const ParcelContract = new web3.eth.Contract(parcelAbi, parcelContract);
const MarketplaceContract = new web3.eth.Contract(marketplaceAbi, marketplaceContract);

function getParcelInfo() {
  ParcelContract.methods.getParcelInfo().call().then(function(result) {
    
    /*
    var tokenIds = [];
    for(let i=0; i<result.events.Transfer.length; i++) {
        tokenIds.push(result.events.Transfer[i].returnValues.tokenId)
        console.log(result.events.Transfer[i].returnValues);
    } 
    */
    console.log(result);
    
})
}

function getSingleParcelInfo(tokenID) {
  ParcelContract.methods.parcelInfo(tokenID).call().then(function(result) {
    
    /*
    var tokenIds = [];
    for(let i=0; i<result.events.Transfer.length; i++) {
        tokenIds.push(result.events.Transfer[i].returnValues.tokenId)
        console.log(result.events.Transfer[i].returnValues);
    } 
    */
    console.log(result);
    
})
}

function getIsMinterComission() {
  ParcelContract.methods.minterComissions("12").call().then(function(result) {
    
    /*
    var tokenIds = [];
    for(let i=0; i<result.events.Transfer.length; i++) {
        tokenIds.push(result.events.Transfer[i].returnValues.tokenId)
        console.log(result.events.Transfer[i].returnValues);
    } 
    */
    console.log(result);
    
})
}


function getSaleInfo() {
  MarketplaceContract.methods.getSaleInfo().call().then(function(result) {
    
    /*
    var tokenIds = [];
    for(let i=0; i<result.events.Transfer.length; i++) {
        tokenIds.push(result.events.Transfer[i].returnValues.tokenId)
        console.log(result.events.Transfer[i].returnValues);
    } 
    */
    console.log(result);
    
})
}


getSingleParcelInfo("2")






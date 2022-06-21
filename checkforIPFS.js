var fs = require('fs');
const execSync = require('child_process').execSync;
const Web3 = require('web3');

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

web3.eth.accounts.wallet.add("0x2d1e783aba31320541875813b5fb1feed8cc022a3890b8338828464f660363f7");

const account = web3.eth.accounts.wallet[0].address;

contract_abi = [{"inputs":[{"internalType":"contract IBEP20","name":"_eebnb","type":"address"},{"internalType":"uint256","name":"_minPrice","type":"uint256"},{"internalType":"string","name":"baseURI","type":"string"},{"internalType":"string","name":"_baseimageURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DevWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_price","type":"uint256"}],"name":"MinPriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"adminWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseDescription","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseimageURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"colBoundaries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eebnb","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"getParcelCoords","outputs":[{"internalType":"uint256[2]","name":"","type":"uint256[2]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getParcelInfo","outputs":[{"components":[{"internalType":"uint256","name":"parcelID","type":"uint256"},{"internalType":"uint256","name":"tokenID","type":"uint256"},{"internalType":"uint256","name":"parcelRow","type":"uint256"},{"internalType":"uint256","name":"parcelCol","type":"uint256"},{"internalType":"uint256","name":"boughtPrice","type":"uint256"},{"internalType":"string","name":"ownerName","type":"string"},{"internalType":"string","name":"mail","type":"string"},{"internalType":"string","name":"twitter","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"internalType":"struct ParcelStruct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getParcelPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"imageName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"keys","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[2][]","name":"_parcelCoords","type":"uint256[2][]"},{"internalType":"string","name":"ownerName","type":"string"},{"internalType":"string","name":"twitter","type":"string"},{"internalType":"string","name":"mail","type":"string"},{"internalType":"bool","name":"wallet","type":"bool"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"multiBuy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"parcelInfo","outputs":[{"internalType":"uint256","name":"parcelID","type":"uint256"},{"internalType":"uint256","name":"tokenID","type":"uint256"},{"internalType":"uint256","name":"parcelRow","type":"uint256"},{"internalType":"uint256","name":"parcelCol","type":"uint256"},{"internalType":"uint256","name":"boughtPrice","type":"uint256"},{"internalType":"string","name":"ownerName","type":"string"},{"internalType":"string","name":"mail","type":"string"},{"internalType":"string","name":"twitter","type":"string"},{"internalType":"address","name":"wallet","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"parcelPrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rowBoundaries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"section","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sectionPrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseDescription","type":"string"}],"name":"setBaseDescription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseImageURI","type":"string"}],"name":"setBaseImageURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"section","type":"uint256"},{"internalType":"uint256[2]","name":"boundary","type":"uint256[2]"}],"name":"setColBoundary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newImageName","type":"string"}],"name":"setImageName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMaxSection","type":"uint256"}],"name":"setMaxSection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setMinPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"parcelID","type":"uint256"},{"internalType":"string","name":"ownerName","type":"string"},{"internalType":"string","name":"twitter","type":"string"},{"internalType":"string","name":"mail","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"boughtPrice","type":"uint256"}],"name":"setParcelInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"section","type":"uint256"},{"internalType":"uint256[2]","name":"boundary","type":"uint256[2]"}],"name":"setRowBoundary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSection","type":"uint256"}],"name":"setSection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"section","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setSectionPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"setTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenID","type":"uint256"},{"internalType":"string","name":"ownerName","type":"string"},{"internalType":"string","name":"twitter","type":"string"},{"internalType":"string","name":"mail","type":"string"},{"internalType":"bool","name":"wallet","type":"bool"}],"name":"updateOwnerInfo","outputs":[],"stateMutability":"nonpayable","type":"function"}]

contract_address = "0x1f414639C28e97C42986D895101c03c9A957080E";

// IPFS name: https://ipfs.io/ipns/k51qzi5uqu5dkda6g3ofqsfbuval07vqnkdx55m2t8e18w5c6udoc1x3rv87g0
const ParcelContract = new web3.eth.Contract(contract_abi, contract_address);

function exists(parcels, parcelID) {
	for(let i=0; i<parcels.length; i++)
		if(parcels[i]["parcelID"] == parcelID)
			return true;
	return false;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	console.log("Script begins, before while loop...")
	while(true) {
		console.log("Loop begins.")
		const parcels = await getParcels();
		let parcelFile = await readParcelFile();

		console.log("Parcel file: ", parcelFile);
		const imageName = await getImageName();
		const baseDescription = await getBaseDescription();
		const baseImageURI = await getBaseImageURI();
		const baseURI = await getBaseURI();

		// console.log(parcels, imageName, baseDescription, baseImageURI, baseURI);

		for(let i=0; i<parcels.length; i++) {
			let pushParcel = parcels[i];
			// console.log("pushParcel: ", pushParcel);
			if(!exists(parcelFile, pushParcel["parcelID"])) {
				console.log("Parcel do not exist, uploading...")
				uploadParcelJSON(pushParcel, imageName, baseDescription, baseURI, baseImageURI)
				console.log("Uploaded");
				parcelFile.push({parcelID: pushParcel["parcelID"], uploaded : true}); //add some data
				json = JSON.stringify(parcelFile); //convert it back to json
				fs.writeFileSync("parcelIPFS_uploads.json", json);
				console.log("parcelFile updated.");
			}
			else{
				console.log("Parcel already exists...");
			}
		}
		console.log("Loop ends, sleeping...")
   		await sleep(60000);
	}
}

async function getParcels() {
	return ParcelContract.methods.getParcelInfo().call();
}

async function getImageName() {
	return ParcelContract.methods.imageName().call();
}

async function getBaseDescription() {
	return ParcelContract.methods.baseDescription().call();
}

async function getBaseURI() {
	return ParcelContract.methods.baseURI().call();
}

async function getBaseImageURI() {
	return ParcelContract.methods.baseimageURI().call();
}

function readParcelFile() {
	let parcels = fs.readFileSync('parcelIPFS_uploads.json',
            {encoding:'utf8', flag:'r'});
	parcels = JSON.parse(parcels);
	return parcels;
}

function uploadParcelJSON(parcel, imageName, baseDescription, baseURI, baseImageURI) {
	const filename = parcel["tokenID"] + ".json";
	// pushParcel["imageName"] = imageName;
	// pushParcel["description"] = "test";
	const pushParcel = {
		"parcelID" : parcel["parcelID"],
		"tokenID" : parcel["tokenID"],
		"tokenURI" : baseURI + filename,
		"parcelRow" : parcel["parcelRow"],
		"parcelCol" : parcel["parcelCol"],
		"boughtPrice" : parcel["boughtPrice"] / 10**18,
		"imageName" : imageName,
		"imageURI" : baseImageURI + parcel["parcelRow"] + "-" + parcel["parcelCol"],
		"description" : baseDescription + parcel["parcelRow"] + "-" + parcel["parcelCol"],
		"ownerName" : parcel["ownerName"],
		"mail" : parcel["mail"],
		"twitter" : parcel["twitter"],
		"wallet" : parcel["wallet"]
	};

	json = JSON.stringify(pushParcel);
	fs.writeFileSync(filename, json);
	execSync('bash addtoIPFS.sh ' + filename + ' bnb', { encoding: 'utf-8' })
	console.log("Filename ", filename, "written and upload script triggered")
}

async function temp() {
	const parcels = await getParcels();
	const imageName = await getImageName();
	const baseDescription = await getBaseDescription();
	const baseImageURI = await getBaseImageURI();
	const baseURI = await getBaseURI();

	console.log(parcels, imageName, baseDescription, baseImageURI, baseURI);
	uploadParcelJSON(parcels[0], imageName, baseDescription, baseURI, baseImageURI)
}
/*
fs.readFile('parcelIPFS_uploads.json', 'utf8', function readFileCallback(err, data){
    	if (err){
        console.log(err);
    	} else {
	parcels = JSON.parse(data); //now it an object
	if(!exists(parcels,5))
		parcels.push({parcelID: 5, uploaded : true}); //add some data
		json = JSON.stringify(parcels); //convert it back to json
		fs.writeFile('parcelIPFS_uploads.json', json, 'utf8', function temp() {}); // write it back 
}});
*/

// getImageName()
// getBaseDescription()
// getBaseURI()
// getBaseImageURI()
main();
//console.log(parcels)
// const output = execSync('ls', { encoding: 'utf-8' });
// console.log(output);

// dumpParcelJSON()
// main()
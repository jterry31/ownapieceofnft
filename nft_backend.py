import json
from fastapi import Request, Response, FastAPI, File, Form, UploadFile
from tempfile import NamedTemporaryFile
import uvicorn
import random
import math
import datetime
import pymongo
import os,shutil
from fastapi.middleware.cors import CORSMiddleware
import multiprocessing
import time
import uuid
from cryptography.fernet import Fernet
from web3 import Web3

secrets = {}
uuids = {}
symKey = "F6Bha_RqzL0bu1UeWH1mkzqDTcgM9cuEWr_aZUhDUcs="
tokenIDRange = [0,979]
claimParcel_funchash = "0xd36df00b"
updateOwnerInfo_funchash = "0x78effb69"
parcelContract = "0x90C56eaBCFaA74b3567b34cF5e91FCeEd8E7E1Fe"
parcelAbi = json.load(open("./parcelNFTAbi.json"))
provider = "https://data-seed-prebsc-1-s1.binance.org:8545"
images_build = "/var/www/html/opn_images_build/"
imageFileLimit = 3000000 # 3MB

origins = [
    "http://localhost:4545",
    "http://192.236.155.185:4545",
    "http://api.ownapieceofnft.com",
    "https://api.ownapieceofnft.com"
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["ihya"]
parcels = mydb["parcels"]
logs = mydb["logs"]
messages = mydb["messages"]
uploadImages = mydb["uploadImages"]

def check_contract(txHash, ip):

    # first, check db for txHash
    record = uploadImages.find_one({"_id" : txHash})

    if record:
        print("record is already in db!!")
        return False 

    try:
        w3 =  Web3(Web3.HTTPProvider(provider))
        tx = w3.eth.get_transaction(txHash)
        txStatus = w3.eth.get_transaction_receipt(txHash)
    
    except Exception as e:
        print("TxHash doesn't exist ", e)
        return False

    # txHash exists but not processed, add to DB and continue
    txHashRecord = {
            "_id" : txHash,
            "ip" : ip
        }
        
    x = uploadImages.insert_one(txHashRecord)
    print("Inserted ID: ", x.inserted_id)
    if not txStatus:
        print("This transaction has failed!")
        return False

    # txHash is succesful

    if tx["input"][0:10] == claimParcel_funchash:
        print("Func is: claimParcel")
        contract = w3.eth.contract(address=Web3.toChecksumAddress(parcelContract), abi=parcelAbi)
        funcData = contract.decode_function_input(tx["input"])

        print(funcData)
        parcelCoords = funcData[1]["_parcelCoords"]
        tokenIDs = []

        imageWidth = contract.functions.imageWidth().call()
        for coord in parcelCoords:
            tokenIDs.append(coord[0]*imageWidth + coord[1])

        return tokenIDs

    elif tx["input"][0:10] == updateOwnerInfo_funchash:
        print("Func is: updateOwnerInfo")
        contract = w3.eth.contract(address=Web3.toChecksumAddress(parcelContract), abi=parcelAbi)
        funcData = contract.decode_function_input(tx["input"])
    
        imageWidth = contract.functions.imageWidth().call()
        print(funcData)
        tokenID = funcData[1]["tokenID"]
        return [tokenID]
    
    # txHash is NOT claimParcel or updateOwnerInfo
    else:
        print("Tx is NOT claimParcel or updateOwnerInfo!")
        return False

def initialize(row, col):
    parcels.delete_many({})
    for i in range(0, row*col):
        parcel = {
            "_id" : i,
            "rowCoord" : "unclaimed",
            "colCoord" : "unclaimed",
            "tokenId" : "unclaimed",
            "tokenURI" : "unclaimed",
            "imageName" : "unclaimed",
            "description" : "unclaimed",
            "imageURI" : "unclaimed", 
            "ownerName" : "unclaimed",
            "mail" : "unclaimed",
            "twitter" : "unclaimed",
            "wallet" : "unclaimed"
        }
        
        x = parcels.insert_one(parcel)
        print("Inserted ID: ", x.inserted_id)

    


def log_parcel_data(parcel):
    parcel_log = {}
    parcel_log["timestamp"] = str(datetime.datetime.now())
    parcel_log["parcel"] = parcel

    x = logs.insert_one(parcel_log)

def submit_message_data(message):
    message_log = {}
    message_log["timestamp"] = str(datetime.datetime.now())
    message_log["cliMessage"] = message

    x = messages.insert_one(message_log)


def handle_uri(filename):
    pass
    #os.system("bash add2toIPFS.sh {0:s}".format(filename))
   


def update_owner_info(ownerInfo):
    tokenId = ownerInfo["tokenId"]
    newOwnerName = ownerInfo["newOwnerName"]
    newTwitter = ownerInfo["newTwitter"]
    newMail = ownerInfo["newMail"]
    newWallet = ownerInfo["newWallet"]
    query = { "tokenId": tokenId }
    newvalues = { "$set": { 
                                "ownerName": newOwnerName,
                                "mail": newMail,
                                "twitter" : newTwitter,
                                "wallet" : newWallet
                            } 
                } 
        
    parcels.update_one(query, newvalues)

def multiclaim_parcel_data(parcel_req):
    for i in range(0, len(parcel_req["_ids"])):
        print(f'Entered parcel data, iteration: {i}, total length: {len(parcel_req["_ids"])}')
        parcelID = parcel_req["_ids"][i]
        print(f'Parcel ID: {parcelID}')
        tokenId = parcel_req["tokenIds"][i]
        print(f'Token ID: {tokenId}')
        parcelRow = parcel_req["rowCoords"][i]
        print(f'Parcel Row: {parcelRow}')
        parcelCol = parcel_req["colCoords"][i]
        print(f'Parcel Col: {parcelCol}')

        query = { "_id": parcelID }
        newvalues = { "$set": { "rowCoord": parcelRow,
                                "colCoord": parcelCol,
                                "tokenId": tokenId,
                                "tokenURI": parcel_req["tokenURI"] + str(tokenId) + ".json",
                                "imageName": parcel_req["imageName"],
                                "description": parcel_req["description"] + str(parcelRow) + "-" + str(parcelCol),
                                "imageURI": parcel_req["imageURI"] + str(parcelRow) + "-" + str(parcelCol),
                                "ownerName": parcel_req["ownerName"],
                                "mail": parcel_req["mail"],
                                "twitter" : parcel_req["twitter"],
                                "wallet" : parcel_req["wallet"]
                            } 
                    } 
        
        print(f'Before updating query')
        parcels.update_one(query, newvalues)
        print(f'After updating query')
        parcel_json = {
            "positionID": parcelID,
            "rowCoord": parcelRow,
            "colCoord": parcelCol,
            "tokenId": tokenId,
            "tokenURI": parcel_req["tokenURI"] + str(tokenId) + ".json",
            "imageName": parcel_req["imageName"],
            "description": parcel_req["description"] + str(parcelRow) + "-" + str(parcelCol),
            "imageURI": parcel_req["imageURI"] + str(parcelRow) + "-" + str(parcelCol),
            "ownerName": parcel_req["ownerName"],
            "mail": parcel_req["mail"],
            "twitter" : parcel_req["twitter"],
            "wallet" : parcel_req["wallet"]
        }

        print(f'Before JSON dump')
        filename = f'{tokenId}.json'
        with open(filename, 'w') as outfile:
            json.dump(parcel_json, outfile)

        print(f'After JSON dump, executing IPFS process')
        p = multiprocessing.Process(target=handle_uri, args=(filename,))
        p.start()
        print(f'Done...')

##############################################################


@app.get("/auth")
def auth():
    newNumber = random.randint(10**10, 10**11)
    newCode = (newNumber*12 + 5) * 26 - 78
    secrets[newNumber] = newCode
    # new_uuid = str(uuid.uuid4())
    # f = Fernet(symKey)
    # encrypted = f.encrypt(new_uuid.encode()).decode()
    # uuids[new_uuid] = encrypted
    return {"authNum" : newNumber}

@app.post("/uploadImage")
async def uploadImage(request: Request, txHash: str = Form(...), authNum: str = Form(...), authCode: str = Form(...), imageFile: UploadFile = File(...)):
    source_ip = request.client.host
    print("Source IP: ", source_ip)
    #req = await req.json()
    authNum = int(authNum)
    authCode = int(authCode)

    print(f"Received authNum: {authNum}, authCode: {authCode}")
    if authCode not in secrets.values():
        print("Access denied")
        return {"response" : "Denied"}

  
    print("First access (authCode) granted, continuing...")
    # First Auth accepted and tokenIDs in range, clear number from list
    del secrets[authNum]

    
    tokenIDs = check_contract(txHash, source_ip)
    if not tokenIDs:
        print("Second access (txHash) denied.") 
        return {"response" : "Denied"}


    print("Second access (txHash) granted, continuing...")
    imageContent = await imageFile.read()
    file_copy = NamedTemporaryFile(delete=False)
    

    #message = req["message"]
    #tokenID = req["tokenID"]

    file_copy.write(imageContent)
    fileSize = os.path.getsize(file_copy.name)
    if os.path.getsize(file_copy.name) > imageFileLimit:
        print(f"File size: {fileSize} is BIGGER than limit of {imageFileLimit} !!")
        return {"response" : "Denied"}
    
    for tokenID in tokenIDs:
        tokenID = str(tokenID)
        print(f"Token ID: {tokenID}, tempfileName: {file_copy.name}")
        shutil.copy(file_copy.name, f"{images_build}{tokenID}.png")
        os.system(f"chmod 644 {images_build}{tokenID}.png")
    file_copy.close()
    os.unlink(file_copy.name)

    return {"response" : "OK"}

    """
    if message not in uuids:
        return {"response" : "Denied"}
    else:
        del uuids[message]
    """

@app.post("/init")
async def initialize_data(req: Request):
    req = await req.json()
    message = req["message"]
    if message not in uuids:
        return {"response" : "Denied"}
    else:
        # row: Int, col: Int
        del uuids[message]
        initialize(req["row"], req["col"])
        return {"initializeStatus" : True}

"""
@app.post("/test")
async def test(req: Request):
    req = await req.json()
    message = req["message"]
    if message not in uuids:
        return {"response" : "Denied"}
    else:
        del uuids[message]
        print(f'New uuids state: {uuids}')
        return {"response" : "Success"}
"""

@app.post("/parcelStatus")
async def read_parcel(req: Request):
    req = await req.json()
    message = req["message"]
    if message not in uuids:
        return {"response" : "Denied"}
    else:
        del uuids[message]
        resp = []
        all_parcels = parcels.find()
        for parcel in all_parcels:
            resp.append(parcel)
        return {"parcelStatus" : resp}

@app.post("/logParcel")
async def log_parcel(parcel: Request):
    parcel = await parcel.json()
    message = parcel["message"]
    if message not in uuids:
        return {"response" : "Denied"}
    else:
        del uuids[message]
        #print(parcel)
        log_parcel_data(parcel)
        return {"logParcelStatus" : True}

@app.post("/submitMessage")
async def submit_message(req: Request):
    req = await req.json()
    message = req["message"]
    #if message not in uuids:
    #    return {"response" : "Denied"}
    #else:
    #    del uuids[message]
        #print(parcel)
    submit_message_data(req)
    return {"submitStatus" : "ok"}


@app.post("/multiclaimParcel")
async def claim_parcel(parcels: Request):
    try:
        parcels = await parcels.json()
        #print(parcels)
        message = parcels["message"]
        if message not in uuids:
            return {"response" : "Denied"}
        else:
            del uuids[message]
            multiclaim_parcel_data(parcels)
            return {"claimParcelStatus" : True}
    except Exception as e:
        print(e)

@app.post("/updateOwner")
async def claim_parcel(ownerInfo: Request):
    try:
        ownerInfo = await ownerInfo.json()
        message = ownerInfo["message"]
        if message not in uuids:
            return {"response" : "Denied"}
        else:
            del uuids[message]
            #print(parcels)
            update_owner_info(ownerInfo)
            return {"updateOwnerStatus" : True}
    except Exception as e:
        print(e)


if __name__ == "__main__":
    uvicorn.run("nft_backend:app", host="0.0.0.0", port=8000, reload=True)

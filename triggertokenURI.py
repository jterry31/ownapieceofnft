import time
import os

while True:
    if os.path.exists("token"):
        line = open("token").readline() 
        os.remove("token")
        tokenId = line.split(" ")[0]
        tokenURI = line.split(" ")[1]
        print(tokenId, tokenURI)
        os.system("node setTokenURI.js {0:d} {1:s}".format(int(tokenId), tokenURI))
    time.sleep(3)

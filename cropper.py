import os
from itertools import product
import sys
from PIL import Image
import requests
import json

jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGM1ODE3OC0yYWI0LTQ5NDUtODcyZi00MGY1NzlmNWIwYTAiLCJlbWFpbCI6Im93bmFwaWVjZW9mYmxvY2tjaGFpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjY3OTgxOWZjYmNmNjBmOGQ3OWMiLCJzY29wZWRLZXlTZWNyZXQiOiI3ZTYwNjRlMGVkY2IyODc1ODVjOGFiNjUxYTFjOGQ3NmU4M2YwY2U3OTNlODUyYzU1ZDc3ZjAxNDhhYTM0ZDczIiwiaWF0IjoxNjE5OTczOTY0fQ.4PwrFVx9k5FQhaYw5Q___h2wTGrV1CmqLnPrexteUR0"


def tile(filename, dir_in, dir_out, d):
    name, ext = os.path.splitext(filename)
    img = Image.open(os.path.join(dir_in, filename))
    w, h = img.size
    
    grid = list(product(range(0, h-h%d, d), range(0, w-w%d, d)))
    for i, j in grid:
        box = (j, i, j+d, i+d)
        row = int(i/d)
        col = int(j/d)
        out = os.path.join(dir_out, f'{name}_{row}_{col}{ext}')
        img.crop(box).save(out)

    
    return int(h/d), int(w/d)


headers = {
    "Authorization" : "Bearer " + jwt
}

filename = "bnb_dark"
extension = "png"
dir_in = "public/images"
dir_out = "parcel_images"
d = 35

image_hashes = {}

row,col = tile(filename + "." + extension, dir_in, dir_out, d)
print(row,col)

for i in range(0,row):
    for j in range(0, col):
        files = {
            'file' : open(f'{dir_out}/{filename}_{i}_{j}.{extension}', 'rb')
        }

        r = requests.post("https://api.pinata.cloud/pinning/pinFileToIPFS", files=files, headers=headers)
        image_hashes[str(i) + "_" + str(j)] = r.json()["IpfsHash"]
        print(r.json()["IpfsHash"])

f = open("src/image_hashes.json" , "w")
json.dump(image_hashes, f)
f.close()











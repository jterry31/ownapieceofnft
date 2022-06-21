import random
import tweepy
import time
import multiprocessing
import json
from datetime import datetime

creds = json.load(open("credentials_tweet.json", "r"))
tweets_json = json.load(open("tweet.json", "r"))
tweets = []

for tweet in tweets_json:
    tweets.append(tweets_json[tweet])

def one_thread(api, username, status):
    api.update_status(status=status)
    print(f'User {username} tweeted: {status}')

for cred in creds:
    consumer_key = creds[cred]["consumer_key"]
    consumer_secret = creds[cred]["consumer_secret"]
    access_token = creds[cred]["access_token"]
    access_token_secret = creds[cred]["access_token_secret"]
    username = creds[cred]["username"]
    if "BANNED" not in username:
        status = tweets[random.randint(0, len(tweets) - 1)]
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        p = multiprocessing.Process(target=one_thread, args=(api, username, status))
        p.start()
        time.sleep(0.5)


import random
import pymongo
import tweepy
import time
import multiprocessing
import json
from datetime import datetime

def exists(user_id, twitter_users):
    x = twitter_users.find_one({"_id" : user_id})
    if x:
        #print_log(f'{user_id} exists.')
        return True
    
    #print_log(f'{user_id} does not exist!!!')
    return False

def add_user(user_id, twitter_users):
    if not exists(user_id):
        x = twitter_users.insert_one({"_id" : user_id, "followed": False, "faved": False, "retweeted": False})
        #print_log("Inserted ID: ", x.inserted_id)
        return True
    else:
        #print_log(f'{user_id} already exists...')
        return False

def findUser(users, min_val, max_val, action):
    while True:
        index = random.randint(min_val, max_val)
        if users[index][action] == False:
            return index

def setAction(user_id, action, twitter_users):
    query = { "_id": user_id }
    new_values = { "$set": { action: True } } 
    
    #old = twitter_users.find_one({"_id" : user_id})
    #print_log("Old: " , old)
    twitter_users.update_one(query, new_values)
    new = twitter_users.find_one({"_id" : user_id})
    print_log("New: ", new)

def print_log(message):
    f = open("bot.log", "a+")
    f.write(message + "\n")
    f.close()

############################ 

def update_folllower_counts(users,apis):
    followers = {}
    total = 0
    for i in range(0,len(users)):
        try:
            user_followers = apis[i].me().followers_count
        except Exception as e:
            print_log(f'USER: {users[i]} || Exception in updateFollowerCount, error is: {e}')
            continue
        followers[users[i]] = user_followers
        total += user_followers
    
    followers["Total"] = total
    with open("followers.json", "w") as outfile:
        json.dump(followers, outfile)
    
    print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || Follower Counts Updated, Total Count among all accounts combined: {total}')

def one_thread(api, username):
    hashtags = ["#NFT", "#NFTs", "#blockchain", "#NFTCommunity", "#NFTartist", "#NFTartists", "#NFTart"]
    exception_time = 45
    sleep_count = -1
    mode = "unfollow"
    print_log(f'Username is: {username}')
    #print_log(f'{username} sleeping...')

    while True:
        time.sleep(1)
        sleep_count += 1
        try:
            if (sleep_count % 720 == 0):
                while True:
                    try:
                        followed_count = api.me().friends_count
                        if followed_count < 30:
                            hashtag = hashtags[random.randint(0,len(hashtags)-1)]
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Mode: FOLLOW, Hashtag for Follow: {hashtag}')
                            tweet = api.search(hashtag, count=1)[0]
                            user_id = tweet.user.id_str
                            user_name = tweet.user.screen_name
                            if tweet.user.followers_count < 100:
                                continue
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Following user {user_name} with {tweet.user.followers_count} followers ...')
                            api.create_friendship(user_id)
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Followed user {user_name} with {tweet.user.followers_count} followers.')
                        
                        else:
                            followed = api.friends_ids(api.me().id_str, count=10)
                            unfollowed_user = followed[5]
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Mode: UNFOLLOW, Unfollowing user id {unfollowed_user} ...')
                            api.destroy_friendship(unfollowed_user)
                            new_followed_count = api.me().friends_count
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Mode: UNFOLLOW, Unfollowed user id {unfollowed_user} ... , we are now following: {followed_count} -> {new_followed_count} users')
                        sleep_count = 0

        
                        break
                    except Exception as e:
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || {str(e)}, trying again...')
                        time.sleep(exception_time)
        except Exception as e:
            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Follow exception: {str(e)}')
        

        try:
            if (sleep_count % 80 == 0):
                while True:
                    try:
                        if username != "ownapieceofnft":
                            hashtag = hashtags[random.randint(0,len(hashtags)-1)]
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Hashtag for Retweet: {hashtag}')
                            tweet = api.search(hashtag, count=1)[0]
                            tweet_id = tweet.id_str
                            user_name = tweet.user.screen_name
                            if tweet.user.followers_count < 100:
                                continue
                            status_url = f'https://twitter.com/{user_name.lower()}/status/{tweet_id}'
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Retweeting tweet {tweet_id} from User {user_name} with {tweet.user.followers_count} followers...')
                            api.retweet(tweet_id)
                            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Retweeted {tweet_id} from User {user_name} with {tweet.user.followers_count} followers.')
                            print_log(f'Retweeted Tweet URL: {status_url}')
                            break
                        else:
                            break
                            # items = api.user_timeline(count=10)
                            # for i in range(0,len(items)):
                            #     if items[i].retweeted == True:
                            #         api.unretweet(items[i].id)
                            #         print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Unretweeted tweet {items[i].id} , sleeping 10 seconds...')
                                   
                    except Exception as e:
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || {str(e)}, trying again...')
                        time.sleep(exception_time)

        except Exception as e:
            print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Retweet exception: {str(e)}')
        

        try:
            if (sleep_count % 180 == 0):
                while True:
                    try:
                        hashtag = hashtags[random.randint(0,len(hashtags)-1)]
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Hashtag for Fav: {hashtag}')
                        tweet = api.search(hashtag, count=1)[0]
                        tweet_id = tweet.id_str
                        user_name = tweet.user.screen_name
                        if tweet.user.followers_count < 100:
                            continue
                        status_url = f'https://twitter.com/{user_name.lower()}/status/{tweet_id}'
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Faving tweet {tweet_id} from User {user_name} with {tweet.user.followers_count} followers...')
                        api.create_favorite(tweet_id)
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Faved {tweet_id} from User {user_name} with {tweet.user.followers_count} followers')
                        print_log(f'Faved Tweet URL: {status_url}')
                        break
                    except Exception as e:
                        print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || {str(e)}, trying again...')
                        time.sleep(exception_time)

        except Exception as e:
             print_log(f'{datetime.now().strftime("%d/%m/%Y %H:%M:%S")} || USER: {username} || Fav exception: {str(e)}')
    ###############################################################################
    """
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["ihya"]
    twitter_users = mydb["twitter_users"]
    users = twitter_users.find()
    counter = 0
    total = 0
    sleep_count = -1
    min_val = 0
    max_val = 3000

    while True:   
        time.sleep(1)
        sleep_count += 1
        try:
            if (sleep_count % 360 == 0):
                while True:
                    try:
                        index = findUser(users, min_val, max_val, "followed")
                        user = users[index]
                        print_log(f'USER: {username} || User {user["_id"]} at index {index} not followed, following...')
                        api.create_friendship(user["_id"])
                        setAction(user["_id"], "followed", twitter_users)
                        print_log("Followed.")
                        sleep_count = 0
                        break
                    except Exception as e:
                        print_log(str(e) + ", trying again...")
        except Exception as e:
            print_log("Follow exception: " + str(e))
        

        try:
            if (sleep_count % 40 == 0):
                while True:
                    try:
                        index = findUser(users, min_val, max_val, "retweeted")
                        user = users[index]
                        print_log(f'USER: {username} || User {user["_id"]} at index {index} not retweeted, retweeting...')
                        tweet_id = api.user_timeline(user["_id"], count=1, page=1)[0].id_str
                        api.retweet(tweet_id)
                        setAction(user["_id"], "retweeted", twitter_users)
                        print_log("Retweeted")
                        break
                    except Exception as e:
                        print_log(str(e) + ", trying again...")

        except Exception as e:
            print_log("Retweet exception: " + str(e))
        

        try:
            if (sleep_count % 90 == 0):
                while True:
                    try:
                        index = findUser(users, min_val, max_val, "faved")
                        user = users[index]
                        print_log(f'USER: {username} || User {user["_id"]} at index {index} first tweet not faved, faving...')
                        tweet_id = api.user_timeline(user["_id"], count=1, page=1)[0].id_str
                        api.create_favorite(tweet_id)
                        setAction(user["_id"], "faved", twitter_users)
                        print_log("Faved")
                        break
                    except Exception as e:
                        print_log(str(e) + ", trying again...")

        except Exception as e:
            print_log("Fav exception: " + str(e))
        """

################################################################################

creds = json.load(open("credentials.json", "r"))
users = []
apis = []

for cred in creds:
    consumer_key = creds[cred]["consumer_key"]
    consumer_secret = creds[cred]["consumer_secret"]
    access_token = creds[cred]["access_token"]
    access_token_secret = creds[cred]["access_token_secret"]
    username = creds[cred]["username"]
    if ("BANNED" not in username) and ("BENCHED" not in username):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        p = multiprocessing.Process(target=one_thread, args=(api, username))
        p.start()
        print_log(f'USER {username} started...')
        users.append(username)
        apis.append(api)
        time.sleep(1)

print_log("Before infinite loop, executing follower_Counts")
while True:
    update_folllower_counts(users,apis)
    time.sleep(600)

"""
hashtags = ["NFTCommunity", "nftcollectors", "nftcollector", "NFTdrop", "NFTGiveaway", "NFTartists", "NFTcollectibles", 
            "NFTartist", "nftartist", "NFTart", "NFTArt"]


for hashtag in hashtags:
    print_log(f'Fetching {hashtag}')
    for i in range(0, 1): # 1000 records can be retrieved, each page holds 20 records, so we need to fetch 50 pages
        print_log(f'Fetching page {i}')
        try:
            users = api.search_users(hashtag, page=i)
        except Exception as e:
            print_log(e)
            wait_time = int(input("Hoe long should I wait?: "))
            time.sleep(wait_time)
        
        print_log(f'Page {i} fetched.')
        for user in users:
            if not exists(user.id_str):
                print_log("not exist")
                add_user(user.id_str)
                add_count += 1
                print_log(f'Added user count: {add_count}')
"""



#user_count = twitter_users.count_documents({})



        
"""
for i in range(175,3100): # We had almost 3100 accounts associated with NFT hashtags
    user = users[i]
    try:
        following = api.friends_ids(user["_id"])
        for x in following:
            if add_user(str(x)):
                counter += 1

    except Exception as e:
        time.sleep(960)
        pass

    try:
        followers = api.followers_ids(user["_id"])
        for y in followers:
            if add_user(str(y)):
                counter += 1

    except Exception as e:
        time.sleep(960) # sleep 15-16 minutes
        pass
    
    total += counter
    print_log(f'Count for user {user["_id"]}: {counter}')
    print_log(f'Total Count: {total}')
    counter = 0
 """


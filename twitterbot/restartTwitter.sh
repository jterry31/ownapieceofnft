for i in $(ps aux | grep ihya | tr -s ' ' | cut -d ' ' -f 2); do kill -9 $i; done
sleep 1
nohup python3 twitter_ihya.py 2>1 & 
disown
tail -f bot.log

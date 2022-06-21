while true; do
	newHash=$(sudo ipfs files stat / | head -n 1)
	ipfs name publish $newHash
	echo "$(date) Published for $newHash" >> publish.log
	sleep 15; done

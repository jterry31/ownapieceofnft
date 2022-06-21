for i in $(ps aux | grep ihya | tr -s ' ' | cut -d ' ' -f 2); do kill -9 $i; done

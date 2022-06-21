filename=$1
copy_dst=$2

logfile="nohup.out"

echo "Adding File $filename ..." >> $logfile
fileHash=$(sudo ipfs add $filename | cut -d ' ' -f 2 )
#echo $fileHash

echo "File added, copying file $filename to IPFS node FS destination: $copy_dst, file Hash: $fileHash" >> $logfile
sudo ipfs files cp /ipfs/$fileHash /$copy_dst/$filename

newHash=$(sudo ipfs files stat / | head -n 1)
echo "File copied, new hash for main directory is: $newHash" >> $logfile

rm $filename
echo "File $filename removed, Done." >> $logfile


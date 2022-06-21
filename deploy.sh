### DEPLOY BUILD TO APACHE DOCUMENT ROOT

rm -rf /var/www/html/farm_backup_build/
mv /var/www/html/farm_build/ /var/www/html/farm_backup_build/
cp -r build/ /var/www/html/farm_build/
cp .htaccess /var/www/html/farm_build/


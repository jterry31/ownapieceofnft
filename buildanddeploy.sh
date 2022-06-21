
### DEPLOY BUILD TO APACHE DOCUMENT ROOT

rm -rf build/
npm run build --max-old-space-size=8000 
read -p "Build OK??: "
rm -rf /var/www/html/app_backup_build/
mv /var/www/html/app_build/ /var/www/html/app_backup_build/
cp -r build/ /var/www/html/app_build/
cp .htaccess /var/www/html/app_build/


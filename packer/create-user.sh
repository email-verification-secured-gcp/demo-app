#!/bin/sh

sudo cp /tmp/webapp.zip /opt/webapp.zip

cd /opt || exit
sudo unzip webapp.zip -d webapp

sudo cp /tmp/verifystart.sh /opt/webapp/verifystart.sh

sudo groupadd csye6225
sudo useradd -s /usr/sbin/nologin -g csye6225 -d /opt/webapp csye6225

cd /opt/webapp || exit
sudo ls -la
sudo npm install

sudo chown -R csye6225:csye6225 /opt/webapp
sudo chmod -R 750  /opt/webapp
sudo touch /var/log/webapp.log
sudo chmod -R 750  /var/log/webapp.log
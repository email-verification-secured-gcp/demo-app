#!/bin/sh

sudo cp /tmp/node.service /etc/systemd/system/node.service

sudo systemctl daemon-reload

echo "start the webapp"
sudo systemctl enable node
sudo systemctl start node
sudo systemctl restart node
sudo systemctl status node

APISRVC=$?

if [ $APISRVC -eq 0 ]; then

  echo "web app started successfully!"

else

  echo "Unable to start web app"

fi
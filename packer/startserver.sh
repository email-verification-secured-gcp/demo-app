#!/bin/sh

sudo cp /tmp/node.service /etc/systemd/system/node.service

sudo systemctl daemon-reload

echo "start the webapp"
sudo systemctl enable node
sudo systemctl start node
sudo systemctl restart node
sudo systemctl status node


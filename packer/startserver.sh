#!/bin/sh

sudo cp /tmp/node.service /etc/systemd/system/node.service
sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl daemon-reload

echo "start the webapp"
sudo systemctl enable node
sudo systemctl restart google-cloud-ops-agent

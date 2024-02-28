#!/bin/sh
sudo dnf -y update
# Install Node.js version 20
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf -y install nodejs

# Install unzip
sudo dnf -y install unzip
#!/bin/sh
sudo dnf -y update
# Install Node.js version 20
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf -y install nodejs

# Install MySQL server
sudo dnf -y install mysql-server
sudo systemctl enable mysqld
sudo systemctl start mysqld
sudo mysqladmin -u root password 'Mad987@#'

mysql -u root -pMad987@# -e "CREATE DATABASE IF NOT EXISTS cloud;"

# Install unzip
sudo dnf -y install unzip
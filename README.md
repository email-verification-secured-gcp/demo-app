# network-cloud-demo-app

Mysql - Database creation & user creation

show databases;

create database cloud;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON cloud.* TO 'user'@'localhost';

SHOW GRANTS FOR 'user'@'localhost';

DROP USER 'user'@'localhost';

FLUSH PRIVILEGES;
# network-cloud-demo-app

Mysql - Database creation & user creation

show databases;

create database cloud;

CREATE USER 'dada'@'localhost' IDENTIFIED BY 'Mad987@#';

GRANT ALL PRIVILEGES ON cloud.* TO 'dada'@'localhost';

SHOW GRANTS FOR 'dada'@'localhost';

DROP USER 'user'@'localhost';

FLUSH PRIVILEGES;
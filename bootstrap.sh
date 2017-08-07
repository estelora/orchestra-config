#!/bin/sh

# clean the package manager cache
 sudo apt-get clean

# check for updates
sudo apt-get -y update

# grab source for node 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

# install node & npm
sudo apt-get -y install nodejs



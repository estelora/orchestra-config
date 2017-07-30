#!/bin/sh
# check for updates
sudo apt-get update

# install node
sudo apt-get -y install nodejs

# create symlink for node
sudo ln -s /usr/bin/nodejs /usr/bin/node

#install npm
sudo apt-get -y install npm

# install lodash
npm i --save lodash

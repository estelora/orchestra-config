var shell = require('shelljs');

function install(package) {
  shell.exec('sudo apt-get -y install ' + package);
}

function remove(package) {
  shell.exec('sudo apt-get -y remove ' + package);
}

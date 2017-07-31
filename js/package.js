var shell = require('shelljs');

function install(package) {
  shell.exec('apt-get -y install ' + package);
}

function remove(package) {
  shell.exec('apt-get -y remove ' + package);
}



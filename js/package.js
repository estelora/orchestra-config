var sh = require('shelljs');

function install(package) {
  sh.exec('sudo apt-get -y install ' + package);
}

function remove(package) {
  sh.exec('sudo apt-get -y remove ' + package);
}



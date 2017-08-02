var sh = require('shelljs');

exports.install = function install(package) {
  sh.exec('sudo apt-get -y install ' + package);
}

exports.remove = function remove(package) {
  sh.exec('sudo apt-get -y remove ' + package);
}



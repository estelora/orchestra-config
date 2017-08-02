var sh = require('shelljs');

exports.start = function start(daemon) {
  sh.exec('sudo service ' + daemon + ' start');
}

exports.stop = function stop(daemon) {
  sh.exec('sudo service ' + daemon + ' stop');
}

exports.restart = function restart(daemon) {
  sh.exec('sudo service ' + daemon + ' restart');
}


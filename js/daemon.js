var sh = require('shelljs');

function start(daemon) {
  sh.exec('sudo service ' + daemon + ' start');
}

function stop(daemon) {
  sh.exec('sudo service ' + daemon + ' stop');
}

function restart(daemon) {
  sh.exec('sudo service ' + daemon + ' restart');
}


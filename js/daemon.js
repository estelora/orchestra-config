var shell = require('shelljs');

function start(daemon) {
  shell.exec('sudo service ' + daemon + ' start');
}

function stop(daemon) {
  shell.exec('sudo service' + daemon + ' stop');
}

function restart(daemon) {
  shell.exec('sudo service ' + daemon + ' restart');
}


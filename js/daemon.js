var shell = require('shelljs');

function start(daemon) {
  shell.exec('service start ' + daemon);
}

function stop(daemon) {
  shell.exec('service stop ' + daemon);
}

function restart(daemon) {
  shell.exec('service restart ' + daemon);
}


var orchestra = require('./src/orchestra.js');

var apacheRoot = '/var/www/html';
var apacheConf = '/etc/apache2/apache2.conf';
var apacheSitesAvailable = '/etc/apache2/conf-available/servername.conf';
var hostname = '/etc/hostname';

var relevantFiles = [
  `${apacheRoot}/index.php`,
  `${apacheRoot}/index.html`,
  apacheConf,
  apacheSitesAvailable,
  hostname
];

var php = `<?php
  header("Content-Type: text/plain");
  echo "Hello, world!\n"; ?>`;

// Install packages
orchestra.installPackage('apache2');
orchestra.installPackage('libapache2-mod-php5');
orchestra.installPackage('php5');

// Configure Apache Files
orchestra.removeFile(`${apacheRoot}/index.html`, 'apache2');
orchestra.writeFileContents(`${apacheRoot}/index.php`, php);
orchestra.appendFileContents(apacheConf, 'ServerName    localhost');
orchestra.writeFileContents(hostname, 'localhost');

// Restart the Apache service
orchestra.restartDaemon('apache2', relevantFiles);

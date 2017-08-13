var orchestra = require('./src/orchestra.js');

var apacheRoot = '/var/www/html';
var apacheConf = '/etc/apache2/apache2.conf';
var apacheSitesAvailable = '/etc/apache2/conf-available/servername.conf';
var serverName= 'localhost';
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
orchestra.installPackage('apache2-bin');
orchestra.installPackage('apache2');
orchestra.installPackage('libapache2-mod-php5');
orchestra.installPackage('php5');

// Configure Apache Files
orchestra.removeFile(`${apacheRoot}/index.html`, 'apache2');
orchestra.writeFileContents(`${apacheRoot}/index.php`, php);
orchestra.appendFileContents(hostname, 'ServerName  localhost');

// Enable Apache2-related Modules
orchestra.executeCommand('sudo a2enmod auth_basic authn_core authn_file authz_core authz_host authz_user access_compat');

// Restart the Apache service, if needed
orchestra.restartDaemon('apache2', relevantFiles);
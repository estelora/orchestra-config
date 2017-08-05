var fs = require('fs');
var sh = require('shelljs');

/*
 * TODO: Add shell.js quiet mode to reduce stdout noise
 * TODO: Make this an npm library
 */

// Package Manager

// TODO: Only install if package does not exist.
exports.installPackage = function install(package) {
  sh.exec('sudo apt-get -y install ' + package);
}

exports.removePackage = function remove(package) {
  sh.exec('sudo apt-get -y remove ' + package);
}


// File Manager

// TODO: Restart the service if the file changes
exports.writeFile = function write(filepath, contents) {
  /*
  * If file doesn't exist, or if it isn't the same as `contents`
  * overwrite `contents`
  */
  if(!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, contents);
    console.log('The file ' + filepath + ' has been saved.');
  } else {
    // Read the file to determine if its contents match the arrangement contents.
    var data = fs.readFileSync(filepath, 'utf8');
    // If the does not match the arrangement contents, write the arrangement contents to the file.
    if(data !== contents) {
      fs.writeFileSync(filepath, contents);
          console.log('The file ' + filepath + ' has been adjusted to match the arrangement.');
    }
  }
}

exports.removeFile = function remove(filepath) {
  // Remove a file if it exists.
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log('The file ' + filepath + ' has been deleted.');
  }
}


// Daemon Manager
exports.restartDaemon = function restart(daemon) {
  /*
  * Only restart when relevant packages change.
  * Compare cached and current package metadata to determine if a package changed.
  */
  var cache = daemon + '.cache';

  if (!fs.existsSync(cache)) {
    sh.exec('sudo service ' + daemon + ' restart');
    console.log('First restart of ' + daemon + '.');
    cacheDaemonVersion(daemon);
  }
  else {
    var cacheData = fs.readFileSync(cache, 'utf8');
    var checkPackageData = sh.exec('apt list ' + daemon);
    if (cacheData !== checkPackageData.toString()) {
      sh.exec('sudo service ' + daemon + ' restart');
      console.log('Package version of ' + daemon + ' changed. Restarting ' + daemon + '.');
      cacheDaemonVersion(daemon);
    } else {
      console.log('Package version is the same. No restart required.');
    }
  }
}

// Cache the version of the daemon by writing the daemon metadata.
function cacheDaemonVersion(daemon) {
  sh.exec('apt list ' + daemon + ' > ' + daemon + '.cache');
}

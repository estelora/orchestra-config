var fs = require('fs');
var sh = require('shelljs');
sh.config.silent = true;

/**
 * TODO: Make this an npm library
 * TODO: Add template string functionality.
 */

// Package Manager
exports.installPackage = function install(package) {
  var packageStatus = checkPackageStatus(package);
  if(packageStatus.includes('rc  ' + package)) {
    sh.exec('sudo apt-get -y install ' + package);
    console.log('Successfully installed ' + package + '.');
  } else if(packageStatus.includes('ii  ' +  package)) {
    console.log('Package ' + package + ' already installed.');
  } else {
     console.log('Package ' + package + ' not found, will not install.');
  }
}

exports.removePackage = function remove(package) {
  var packageStatus = checkPackageStatus(package).toString();
  if(packageStatus.includes('ii  ' + package)) {
    sh.exec('sudo apt-get -y remove ' + package);
    console.log('Successfully removed ' + package + '.');
  } else if (packageStatus.includes('rc  ' + package)) {
    console.log('Package ' + package + ' not installed, no need to remove.');
  } else {
    console.log('Package ' + package + ' not found, will not remove.');
  }
}

function checkPackageStatus(package) {
  var status = sh.exec('dpkg -l ' + package).toString();
  return status;
}

// File Manager
// TODO: Restart the service if the file contents change
exports.writeFileContents = function write(filepath, contents) {
  /**
  * If file doesn't exist, or if it isn't the same as `contents`
  * overwrite `contents`
  */
  if(!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, contents);
    console.log('The file ' + filepath + ' has been saved.');
  } else {
    /**
    * checkFileMetadata(filepath);
    * Read the file to determine if its contents match the arrangement contents.
    */
    var data = fs.readFileSync(filepath, 'utf8');
    /**
    * If the file's contents do not match the arrangement contents,
    * write the arrangement contents to the file.
    */
    if(data !== contents) {
      fs.writeFileSync(filepath, contents);
          console.log('The file ' + filepath + ' has been adjusted to match the arrangement.');
    }
  }
}

exports.removeFile = function remove(filepath) {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log('The file ' + filepath + ' has been deleted.');
  }
}

exports.writeFilePermissions = function write(path, mode) {
  //TODO:  error handling
  fs.chmodSync(path, mode);
}

exports.writeFileOwner = function write(path, uid, gid) {
  //TODO: error handling
  fs.chownSync(path, uid, gid);
}


// Daemon Manager
exports.restartDaemon = function restart(daemon) {
  /**
  * Only restart when relevant packages change.
  * Compare cached and current package metadata to determine if a package changed.
  */
  var cache = '/var/cache/orchestra/' + daemon + '.cache';

  if (!fs.existsSync(cache)) {
    sh.exec('sudo service ' + daemon + ' restart');
    console.log('First restart of ' + daemon + '.');
    console.log('Creating orchestra cache directory...');
    sh.exec('sudo mkdir /var/cache/orchestra/');
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
      console.log('Package version for ' + daemon + ' is the same. No restart required.');
    }
  }
}

function cacheDaemonVersion(daemon) {
  sh.exec('apt-cache show ' + daemon + ' > /var/cache/orchestra/' + daemon + '.cache');
}

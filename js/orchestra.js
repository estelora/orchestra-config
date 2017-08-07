var fs = require('fs');
var sh = require('shelljs');
sh.config.silent = true;

var orchestraCacheHome = `${process.env.HOME}/.cache/orchestra`;
var packageCmd = 'sudo apt-get -y';
var list = 'apt list';


// Package Manager
exports.installPackage = function install(package) {
  sh.exec(`${packageCmd} install  + package`);
};

exports.removePackage = function remove(package) {
  sh.exec(`${packageCmd} remove  + package`);
};

// File Manager
exports.writeFileContents = function write(filepath, contents) {
  /**
  * If file doesn't exist, or if it isn't the same as `contents`
  * overwrite `contents`
  */
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, contents);
    console.log(`The file ${filepath} has been saved.`);
  } else {
    // Read the file to determine if its contents match the arrangement contents.
    var data = fs.readFileSync(filepath, 'utf8');
    /**
    * If the file's contents do not match the arrangement contents,
    * write the arrangement contents to the file.
    */
    if (data !== contents) {
      fs.writeFileSync(filepath, contents);
      console.log(
        `The file ${filepath} has been adjusted to match the arrangement.`
      );
    }
  }
};

exports.removeFile = function remove(filepath) {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log(`The file ${filepath} has been deleted.`);
  }
};

exports.writeFilePermissions = function write(path, mode) {
  fs.chmodSync(path, mode);
};

exports.writeFileOwner = function write(path, uid, gid) {
  fs.chownSync(path, uid, gid);
};

// Daemon Manager
exports.restartDaemon = function restart(daemon, files = []) {
  /**
   * Only restart when relevant packages change.
   * Compare cached and current package metadata to determine if a package changed.
   */

  // If any file in the array returns true, restart the daemon.
  var hasFileChanged = files.some(didFileChange);
  var cache = `${orchestraCacheHome}/${daemon}.cache`;

  var shouldRestart = false;
  if (hasFileChanged) {
    shouldRestart = true;
  }
  if (!fs.existsSync(cache)) {
    console.log(`First restart of ${daemon}.`);
    console.log(cache);
    console.log('Creating orchestra cache directory...');
    sh.exec(`mkdir -p ${orchestraCacheHome}`);
    cacheDaemonVersion(daemon);
    shouldRestart = true;
  } else {
    var cacheData = fs.readFileSync(cache, 'utf8');
    var checkPackageData = sh.exec(`${list} daemon`);
    if (cacheData !== checkPackageData.toString()) {
      console.log(`Package version for ${daemon} changed.`);
      cacheDaemonVersion(daemon);
      shouldRestart = true;
    } else {
      console.log(`Package version for ${daemon} is the same.`);
    }
  }
  if (shouldRestart) {
    sh.exec(`sudo service ${daemon} restart`);
    console.log(`Restarting ${daemon}.`);
  }
};

function didFileChange(file) {
  if (!fs.existsSync(file)) {
    console.log(`File ${file} does not exist.`);
  } else {
    var fileStats = fs.statSync(file);
    var cacheTime = readCacheModifyTime(file);
    if (fileStats.mtime.toString() !== cacheTime) {
      cacheFileModifyTime(file);
      return true;
    }
  }
  return false;
}

function cacheFileModifyTime(filepath) {
  var modStats = fs.statSync(filepath);
  var cacheName = filepath.replace(/\//g, '-');
  sh.exec(`mkdir -p ${orchestraCacheHome}`);
  fs.writeFileSync(`${orchestraCacheHome}/${cacheName}.mtime`, modStats.mtime);
}

function readCacheModifyTime(filepath) {
  var cacheName = filepath.replace(/\//g, '-');
  var cacheFilePath = `${orchestraCacheHome}/${cacheName}.mtime`;
  if (fs.existsSync(cacheFilePath)) {
    var cacheContents = fs.readFileSync(cacheFilePath, 'utf8');
    return cacheContents;
  }
}

function cacheDaemonVersion(daemon) {
  var daemonCache = sh.exec(`${list} ${daemon}`);
  console.log(daemonCache.toString());
  fs.writeFileSync(`${orchestraCacheHome}/${daemon}.cache`, daemonCache);
}

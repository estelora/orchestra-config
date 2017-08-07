var fs = require('fs');
var sh = require('shelljs');
var mkdirp = require('mkdirp');
sh.config.silent = true;

var orchestraCacheHome = `${process.env.HOME}/.cache/orchestra`;

// Package Manager
exports.installPackage = function install (pkg) {
  sh.exec(`sudo apt-get -y install ${pkg}`);
};

exports.removePackage = function remove (pkg) {
  sh.exec(`sudo apt-get -y remove ${pkg}`);
};

// File Manager
exports.writeFileContents = function write (filepath, contents) {
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

exports.removeFile = function remove (filepath) {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log(`The file ${filepath} has been deleted.`);
  }
};

exports.writeFilePermissions = function write (filepath, mode) {
  try {
    fs.chmodSync(filepath, mode);
  } catch (error) {
    console.error(`Failed to write permissions at ${filepath}. ${error}`);
  }
};

exports.writeFileOwner = function write (filepath, uid, gid) {
  try {
    fs.chownSync(filepath, uid, gid);
  } catch (error) {
    console.error(`Failed to change owner at ${filepath}. ${error}`);
  }
};

// Daemon Manager
exports.restartDaemon = function restart (daemon, files = []) {
  /**
   * Only restart when relevant packages or files change.
   * Compare cached and current package metadata to determine if a package changed.
   * Compare cached and current file metadata to determine if a file has changed.
   */

  // If any file in the array `files` returns true, restart the daemon.
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

    mkdirp.sync(orchestraCacheHome);
    cacheDaemonVersion(daemon);
    shouldRestart = true;
  } else {
    var cacheData = fs.readFileSync(cache, 'utf8');
    var checkPackageData = sh.exec(`apt list ${daemon}`);

    if (cacheData !== checkPackageData.toString()) {
      console.log(`Package version for ${daemon} changed.`);
      cacheDaemonVersion(daemon);
      shouldRestart = true;
    }
  }
  if (shouldRestart) {
    console.log(`Restarting ${daemon}.`);
    sh.exec(`sudo service ${daemon} restart`);
  }
};

function didFileChange (file) {
  if (fs.existsSync(file)) {
    var fileStats = fs.statSync(file);
    var cacheTime = readCacheModifyTime(file);

    if (fileStats.mtime.toString() !== cacheTime) {
      cacheFileModifyTime(file);
      return true;
    }
  }
  return false;
}

function cacheFileModifyTime (filepath) {
  var modStats = fs.statSync(filepath);
  var cacheName = filepath.replace(/\//g, '-');

  mkdirp.sync(orchestraCacheHome);
  fs.writeFileSync(`${orchestraCacheHome}/${cacheName}.mtime`, modStats.mtime);
}

function readCacheModifyTime (filepath) {
  var cacheName = filepath.replace(/\//g, '-');
  var cacheFilePath = `${orchestraCacheHome}/${cacheName}.mtime`;

  if (fs.existsSync(cacheFilePath)) {
    var cacheContents = fs.readFileSync(cacheFilePath, 'utf8');
    return cacheContents;
  }
}

function cacheDaemonVersion (daemon) {
  var daemonCache = sh.exec(`apt list ${daemon}`);

  console.log(daemonCache.toString());
  fs.writeFileSync(`${orchestraCacheHome}/${daemon}.cache`, daemonCache);
}

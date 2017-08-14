# orchestra-config
> A simple configuration management tool.

## Install

```
npm install --save orchestra-config
```

## Supported Platforms
* Created for Ubuntu Linux
* Tested on Ubuntu 14.04

## Setup
* Clone or download this repository onto your Ubuntu machine.
* Bootstrap your machine to get things ready:
    * Run `sudo chmod 0755 boostrap.sh` in the project directory.
    * Execute this file: `./bootstrap.sh`.
* Create an arrangement!

## Overview
### Package Manager
> Manages debian packages

#### orchestra.installPackage(pkg);
> Installs a single debian package, passed in as a string parameter.

* Invocation:
    ```
    // Installs debian package htop
    orchestra.installPackage('htop');
    ```
#### orchestra.removePackage(pkg);
> Removes a single debian package, passed in as a string parameter.

* Invocation:

    ```
    // Removes debian package htop
    orchestra.removePackage('htop');
    ```

### File Manager
> * Writes content to files, appends contents to files, & removes files.
> * Writes metadata to files, including permissions, user, and group.

#### orchestra.writeFileContents(filepath, contents);
> * Creates a file `filepath` and writes `contents` to `filepath` if it does not yet exist.
> * If the `contents` of `filepath` do not match the `contents` specified in the arrangement, the `contents` of filepath are adjusted to match what is specified in the arrangement.

* Invocation:

```
// Writes contents 'Hello World!' to filepath `/${process.env.HOME}/hello.txt`
orchestra.writeFileContents(`/${process.env.HOME}/hello.txt`, 'Hello, World!');
```

#### orchestra.appendFileContentst(filepath, contents);
> Appends `contents` to the end of file `filepath` if `filepath` does not already contain `contents`.

* Invocation:

```
// Appends `contents` '127.0.0.1 localhost' to `filepath` `/etc/hosts`
orchestra.appendFileContents('127.0.0.1 localhost', '/etc/hosts');
```

#### orchestra.removeFile(filepath);
> Removes a file if it exists.

* Invocation:

```
// Removes `/${process.env.HOME}/hello.txt`
orchestra.removeFile(`/${process.env.HOME}/hello.txt`);
```

#### writeFilePermissions(filepath, mode);
> Adjusts access permissions `mode` on a `filepath`.

* Invocation:

```
// Sets access permissions `/${process.env.HOME}/hello.txt` to `0755`.
orchestra.writeFileOwner(`/${process.env.HOME}/hello.txt`, 0755);
```

#### writeFileOwner(filepath, uid, gid);
> Adjusts user `uid` and groud `guid` for a given file `filepath`.

```
// Sets user to root (`0`) to and group to root (`0`) for `/${process.env.HOME}/hello.txt`.
orchestra.writeFilePermissions(`/${process.env.HOME}/hello.txt`, 0, 0);
```

### Daemon Manager
> * Restarts a service when relevant files and packages have changed.
> * Checks if a file has changed.
> * Caches a file's modify time.
> * Caches the version of a daemon.

#### orchestra.restartDaemon(daemon, files = []);
> * Restarts a daemon if the daemon package version has changed.
> * Restarts a daemon if a relevant file in array `files` has changed.

Invocation:

```
// Restarts daemon `nginx` if relevant conf files:
// '/etc/nginx/nginx.conf' & '/etc/nginx/nginx.conf' have changed.
// Restarts daemon `nginx` if the package version
// for daemon `nginx` has changed.
orchestra.restartDaemon(`nginx`, ['/etc/nginx/nginx.conf', '/etc/nginx/nginx.conf']);
```

## Usage
> This configuration manager only runs when it is executed on the command line.

### Run an arrangement
* Execute an arrangement with node on the command line.

```
sudo node hello-php-arrangement.js
```
## How to create an arrangement (configuration file)
> Create an arrangement file with `require('orchestra-config');`
It should include orchestra at the top.

## How to configure an arrangement
* An sample arrangement included in this repository is `hello-php-arrangement.js`.

### Manage packages first.

### Configure files you need.

### Finally, add the restartDaemon() function at the end.
> This allows your service to restart when files relevant to it change.

### Set variables as strings as contents for files you need orchestra to write.
* Example:

```
var php = `<?php
  header("Content-Type: text/plain");
  echo "Hello, world!\n"; ?>`;
```

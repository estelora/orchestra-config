var fs = require('fs');
var sh = require('shelljs');
var package = require('./package.js');
var manageFile = require('./manageFile.js');
var daemon = require('./daemon.js');

/* TODO:
 * 1. Start orchestra
 * 2. Pass in files and services to check for checkIfHasChanged();
 * 3. If anything changed, we rerun the orchestra arrangement.
 * 4. Change the files we want
 * 5. Restart service, if applicable
 */
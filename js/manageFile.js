var fs = require('fs');
var sh = require('shelljs');

//TODO: add daemon restart after a file changes
exports.watch = function watch(path) {
  fs.watchFile(path, function (curr, prev) {
    sh.echo('the current mtime is: ${curr.mtime}');
    sh.echo('the previous mtime was: ${prev.mtime}');
  });
}

exports.write = function write(filepath, contents) {
  fs.writeFile(filepath, contents, (err) => {
    if (err) throw err;
    sh.echo('The file ' + filepath + ' has been saved.');
  });
}

exports.remove = function remove(filepath) {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    sh.echo('The file ' + filepath + ' has been deleted.');
  });
}


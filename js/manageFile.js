var fs = require('fs');
var sh = require('sh');

function watchFile(path) {
  fs.watchFile(path, function (curr, prev) {
    sh.echo('the current mtime is: ${curr.mtime}');
    sh.echo('the previous mtime was: ${prev.mtime}');
  });
}

function writeFile(filepath, contents) {
  fs.writeFile(filepath, contents, (err) => {
    if (err) throw err;
    sh.echo('The file ' + filepath + ' has been saved.');
  });
}

function deleteFile(filepath) {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    sh.echo('The file ' + filepath + ' has been deleted!');
  });
}


var fs = require('fs');

function watchFile(path) {
  fs.watchFile(path, function (curr, prev) {
    console.log('the current mtime is: ${curr.mtime}');
    console.log('the previous mtime was: ${prev.mtime}');
  });
}

function writeFile(filepath, contents) {
  fs.writeFile(filepath, contents, (err) => {
    if (err) throw err;
    console.log('The file ' + filepath + ' has been saved.');
  });
}

function deleteFile(filepath) {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('The file ' + filepath + ' has been deleted!');
  });
}


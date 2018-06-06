/**
 * 异步删除非空目录
 */
let fs = require('fs');
let path = require('path');

const rmdir = (dir) => {
  let dirs = [dir];
  let index = 0;

  function rmdir(index) {
    let dir = dirs[index];
    if (index < 0) return;
    fs.stat(dir, function (err, stat) {
      if (stat.isDirectory()) {
        fs.rmdir(dir, function () {
          rmdir(--index);
        });
      } else {
        fs.unlink(dir, function () {
          rmdir(--index);
        });
      }
    });
  }

  !function next() {
    if (index == dirs.length) return rmdir(dirs.length - 1);
    let current = dirs[index];
    fs.stat(current, function (err, stat) {
      if (stat.isDirectory()) {
        fs.readdir(current, function (err, files) {
          if (err) return console.error(err);
          if (files) {
            files.forEach(file => {
              dirs.push(path.join(current, file));
            });
          }
          index++;
          next();
        });
      } else {
        index++;
        next();
      }
    });
  }();
};

module.exports = rmdir;
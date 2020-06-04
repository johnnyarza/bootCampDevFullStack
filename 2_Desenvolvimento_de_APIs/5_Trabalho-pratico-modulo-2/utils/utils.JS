const fs = require('fs');
const utils = {
  readFile: function (path) {
    return fs.promises.readFile(path, 'utf8');
  },
  writeFile: function (path, json) {
    return fs.promises.writeFile(path, JSON.stringify(json));
  },
};

module.exports = utils;

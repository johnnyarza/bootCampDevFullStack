const fs = require('fs');

const utils = {
  readFile(path) {
    return fs.promises.readFile(path, 'utf-8');
  },
  writeFile(path, json) {
    return fs.promises.writeFile(path, JSON.stringify(json));
  },
};

module.exports = utils;

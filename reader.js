module.exports = function() {
  var fs = require('fs');

  // the program only for Windows, so '\r\n' is used

  var arr = fs
  .readFileSync('data/urls.txt', 'utf8')
  .split('\r\n')
  .filter(function(item) {
    return item;
  });

  return arr;
}
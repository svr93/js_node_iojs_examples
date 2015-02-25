/* ----- base modules ----- */

var http = require('http');
var https = require('https');

/* ----- additional modules ----- */

var htmlparser = require('htmlparser');

/* ----- own modules ----- */

var reader = require('./reader.js');
var urlArr = reader();

var baseHandler = new htmlparser.DefaultHandler(function (error, dom) {

});

var parser = new htmlparser.Parser(baseHandler);

/* ----- command line args reading ----- */

/* it takes to set 'https' to use https-connection
   or set 'http'/nothing to use http-connection;
   both parameters are prohibited */

if (process.argv.indexOf('https') != -1 && process.argv.indexOf('http') == -1) {
  setHttpsParams();
} else if (process.argv.indexOf('https') == -1) {
  setHttpParams();
} else console.log('error');

function setHttpParams() {
  console.log('http_params');
}

function setHttpsParams() {
  console.log('https_params');
}

var http = require('http');
var https = require('https');

var cookies = {};

getPage(https, "m.avito.ru/moskva/predlozheniya_uslug");
getPage(https, "m.avito.ru/moskva/predlozheniya_uslug/arenda_ekskavatorov_kopaem_kotlovany_burim_354017015");

function getPage(proto, url) {
  var hostname = null;
  var path = '/';

  var index = url.indexOf('/');

  if (index == -1) {
    hostname = url;
  } else {
    hostname = url.slice(0, index);
    path = url.slice(index);
  }

  proto.get({
    hostname: hostname,
    path: path,
    headers: {

    }
  }, function(res) {

    var resCookies = res.headers['set-cookie'];
    resCookies.forEach(parseCookies);

    console.log(cookies);
    console.log('----- delimiter -----');
  });
}

function parseCookies(cookie) {
  var params = cookie.split("; ");
  var name = params[0].split('=')[0];

  var tmpObj = {};

  params.forEach(function(property) {

    var tmpArr = property.split('=');
    var key = tmpArr[0].toLowerCase();
    var value = tmpArr[1];

    tmpObj[key] = value;
  });

  if (!cookies[name]) {

    cookies[name] = [];
    cookies[name].push(tmpObj);
  } else {

    var replaced = false;

    for (var i = 0; i < cookies[name].length; ++i) {
      var item = cookies[name][i];

      if (item['path'] == tmpObj['path'] &&
          item['domain'] == tmpObj['domain']) {

        item = tmpObj;
        replaced = true;
        break;
      }
    }

    if (replaced) return;

    cookies[name].push(tmpObj);
  }
}

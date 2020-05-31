var test = require('./test-module');
console.log(test.testFunction());

/*var http = require('http');
http.createServer(function (req, res) {
  if ((req.method === 'GET') && (req.url === '/test')) {
    res.write('GET /test');
  } else {
    res.write('Hello World!');
  }
  res.statusCode = 200;
  res.end();
}).listen(8080);*/

let a = "1";
const b = "2"
b = 1;
console.log(a + b);

var fs = require('fs');
fs.readFile('./test-file.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
  }
});


var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('testEvent', function () {
  console.log('Test event done');
});

eventEmitter.emit('testEvent');




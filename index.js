var CGMinerClient = require('cgminer');

var HOST = '10.0.0.7';
var PORT = 4028;

var client = new CGMinerClient(HOST, PORT);

client.COMMAND('summary').then(function(results) {
  console.log(results);
}, function(err) {
  console.log(err);
});

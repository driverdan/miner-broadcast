// Coffeescript required for cgminer lib
require('coffee-script');

var CGMinerClient = require('cgminer');

var HOST = '10.0.0.7';
var PORT = 4028;

var client = new CGMinerClient(HOST, PORT);

client.summary().then(function(results) {
  console.log('Result', results);
}, function(err) {
  console.log('Error', err);
});

// Coffeescript required for cgminer lib
require('coffee-script');

var CGMinerClient = require('cgminer');
var io = require('socket.io-client');

// host path
var HOST = 'http://10.0.0.4:8080';
var NAME = 'miner1';

// connection to remote host
var socket = io.connect(HOST);

console.log('Connected to %s', HOST);

// cgminer client
var client = new CGMinerClient();

// Send summary data to the host
var sendSummary = function () {
  client.summary().then(function(data) {
    if (data && data.SUMMARY && data.SUMMARY.length) {
      socket.emit('miner:summary', {id: NAME, summary: data.SUMMARY[0]});
    } else {
      console.log('error with summary data');
    }
  }, function(err) {
    console.log('Error', err);
  });
};

setInterval(sendSummary, 5000);

console.log('sendSummary started');

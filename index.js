// Coffeescript required for cgminer lib
require('coffee-script');

var CGMinerClient = require('cgminer');
var io = require('socket.io-client');

// host path
var HOST = 'http://10.0.0.4:8080';
var NAME = 'miner1';

// cgminer client
var client = new CGMinerClient();

// Send summary data to the host
var sendSummary = function () {
  client.summary().then(function(data) {
    if (data && data.SUMMARY && data.SUMMARY.length) {
      socket.broadcast.emit('miner:summary', {id: NAME, summary: data.SUMMARY[0]});
    } else {
      console.log('error with summary data');
    }
  }, function(err) {
    console.log('Error', err);
  });
};

// connection to remote host
var socket = io.connect(HOST, {
  // Increase delay and reconnect attempts
  // We want to keep trying to reconnect for as long as is reasonable
  'reconnection delay': 1000,
  'max reconnection attempts': 1000
});

var sendSummaryInterval;

socket.on('connect', function () {
  console.log('connected to %s', HOST);

  sendSummaryInterval = setInterval(sendSummary, 5000);
  console.log('sendSummary started');
});
socket.on('disconnect', function () {
  console.log('disconnected');

  if (sendSummaryInterval === 0 || sendSummaryInterval) {
    clearInterval(sendSummaryInterval);
  }
});
socket.on('reconnecting', function (delay, attempts) {
  console.log('Attempt %d to reconnect', attempts);
});

var neuralHelpers = require('../neuralHelpers/neuralHelpers');
var findAllAsync = require('./dbHandler.js').findAllAsync;

var network;

findAllAsync(data => {
  console.log('training neural network');
  network = neuralHelpers.createNetwork(data);
  console.log('training neural network - done');
});

module.exports = function(callback, query, res) {
  if (network) {
    var result = neuralHelpers.consultNetwork(network, query);
    callback(result, res);
  } else {
    res.status(201).send();
  }
};

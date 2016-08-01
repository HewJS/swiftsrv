var neuralHelpers = require('../neuralHelpers/neuralHelpers');
var findAllAsync = require('./dbHandler.js').findAllAsync;
var fs = require('fs');

var network = neuralHelpers.networkFromJSON(JSON.parse(fs.readFileSync(__dirname + '/../neuralHelpers/sampleNetwork.json', 'utf-8')));

findAllAsync(data => {
  network = neuralHelpers.createNetwork(data);
  fs.writeFile(__dirname + '/../neuralHelpers/sampleNetwork.json', JSON.stringify(neuralHelpers.networkToJSON(network)));
});

console.log(neuralHelpers.consultNetwork(network, { emoticons: { angry: 1 }}));

module.exports = network;

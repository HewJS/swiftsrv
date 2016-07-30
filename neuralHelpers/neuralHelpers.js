var synaptic = require('synaptic');

var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;

// These can be changed at your leisure!
// In particular, the first category is the 'default' category
var possibleMoods = ['Happy', 'Sad'];
var possibleCategories = ['Popular', 'Italian', 'Chipotle'];

// Output: An array of zeros of length n
var zerosArr = function(n, currArr) {
  currArr = currArr || [];

  if (n === 0) {
    return currArr;
  }

  return zerosArr(n-1, currArr.concat([0]));
};

// Output: An array of zeros of length n, save for a 1 at the ith index
var makeOneArr = function(n, i) {
  var blankArr = zerosArr(n);
  blankArr[i] = 1;
  return blankArr;
};

// Output: A rounded version of arr
// (e.g., roundEntries([0.4,0.6]) === [0,1])
var roundEntries = function(arr) {
  return arr.map(Math.round);
};

// Output: The training data corresponding to frontEndData
// See "example.js" for an example of what the frontEndData looks like
var frontEndToTrainingData = function(frontEndData) {
  return frontEndData.map(function(frontEndEntry) {
    var inputIndex = possibleMoods.indexOf(frontEndEntry.mood);
    var outputIndex = possibleCategories.indexOf(frontEndEntry.category);

    if (outputIndex === -1) {
      outputIndex = 0;
    }

    return {
      input: makeOneArr(possibleMoods.length, inputIndex),
      output: makeOneArr(possibleCategories.length, outputIndex)
    };
  });
};

// Output: A neural network which is trained with the frontEndData
var createNetwork = function(frontEndData) {
  var newNet = new Architect.Perceptron(possibleMoods.length, 10, possibleCategories.length);

  var trainingOptions = {
    rate: .1,
    iterations: 20000,
    error: .005,
  }

  newNet.trainer.train(frontEndToTrainingData(frontEndData), trainingOptions);

  return newNet;
};

// Output: A sting consisting of all the categories the "network" associates with the given "mood"
var consultNetwork = function(network, mood) {
  var inputVector = makeOneArr(possibleMoods.length, possibleMoods.indexOf(mood));
  var outputVector = network.activate(inputVector);

  var roundedOutput = roundEntries(outputVector);

  return roundedOutput.reduce(function(categories, nextOutputEntry, i) {
    if (nextOutputEntry === 1) {
      return categories.concat(possibleCategories[i]);
    }

    return categories;
  }, []).join(' ');
};

module.exports = { createNetwork, consultNetwork };

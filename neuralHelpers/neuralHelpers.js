var _ = require('lodash');
var synaptic = require('synaptic');

var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;

// These can be changed at your leisure!
// In particular, the first type/keyword is the 'default' type/keyword
var possibleMoods = ['happy', 'sad', 'crying', 'lazy', 'energetic', 'drunk', 'nervous', 'tired', 'angry', 'sick', 'smug'];
var possibleTypes = ['Popular', 'Italian', 'Mexican', 'Desserts', 'Delivery', 'Juice bar', 'Fast food', 'Tea room', 'Coffee', 'Crabs', 'Soup', 'French', 'Pasta', 'Chipotle'];
var possibleKeywords = [''];

// Output: An array of zeros of length n, save for a 1 at the "indices"
var makeOneArr = function(n, indices) {
  return _.range(n).map(function(entry, i) {
    return indices.indexOf(i) >= 0 ? 1 : 0;
  });
};

// Output: A rounded version of arr
// (e.g., roundEntries([0.4,0.6]) === [0,1])
var roundEntries = function(arr) {
  return arr.map(Math.round);
};

// Output: The result of converting the passed emoticons object
// to its correponding mood indices
var emoticonsToMoodIndices = function(emoticons) {
  var moodsArr = Object.keys(emoticons).filter(function(emoticonKey) {
    return emoticons[emoticonKey] === 1;
  });

  return moodsArr.map(function(mood) {
    return possibleMoods.indexOf(mood);
  });
};

// Output: The training data corresponding to frontEndData
// See "example.js" for an example of what the frontEndData looks like
var frontEndToTrainingData = function(frontEndData) {
  return frontEndData.map(function(frontEndEntry) {
    var inputIndices = emoticonsToMoodIndices(frontEndEntry.emoticons);

    var typeIndex = possibleTypes.indexOf(frontEndEntry.selected.type);
    var keywordIndex = possibleKeywords.indexOf(frontEndEntry.selected.keyword);

    if (typeIndex === -1) {
      typeIndex = 0;
    }

    if (keywordIndex === -1) {
      keywordIndex = 0;
    }

    return {
      input: makeOneArr(possibleMoods.length, inputIndices),
      output: makeOneArr(
        possibleTypes.length + possibleKeywords.length,
        [typeIndex, possibleTypes.length + keywordIndex]
      )
    };
  });
};

// Output: A neural network which is trained with the frontEndData
var createNetwork = function(frontEndData) {
  var newNet = new Architect.Perceptron(
    possibleMoods.length,
    Math.max(possibleMoods.length, possibleTypes.length + possibleKeywords.length),
    possibleTypes.length + possibleKeywords.length
  );

  var trainingOptions = {
    rate: .1,
    iterations: 20000,
    error: .005,
  };

  newNet.trainer.train(frontEndToTrainingData(frontEndData), trainingOptions);

  return newNet;
};

// Output: A sting consisting of all the categories the "network" associates with the given "mood"
var consultNetwork = function(network, emoticons) {
  var inputIndices = emoticonsToMoodIndices(emoticons);

  var inputVector = makeOneArr(possibleMoods.length, inputIndices);
  var outputVector = network.activate(inputVector);

  // // shows the output vector
  // for (var i = outputVector.length - 1; i >= 0; i--) {
  //   console.log(outputVector[i], possibleTypes.concat(possibleKeywords)[i]);
  // }

  var roundedOutput = roundEntries(outputVector);

  return roundedOutput.reduce(function(categories, nextOutputEntry, i) {
    if (nextOutputEntry === 1) {
      if (i < possibleTypes.length) {
        return categories.concat(possibleTypes[i]);
      } else {
        return categories.concat(possibleKeywords[i - possibleTypes.length]);
      }
    }

    return categories;
  }, []).join(' ');
};

// Output: A JSON representation of a Synaptic neural network
var networkToJSON = function(network) {
  return network.toJSON();
};

// Output: The Synaptic neural network represented by the provided JSON
var networkFromJSON = function(json) {
  return Network.fromJSON(json);
};

module.exports = { createNetwork, consultNetwork, networkToJSON, networkFromJSON };

var createNetwork = require('./neuralHelpers').createNetwork;
var consultNetwork = require('./neuralHelpers').consultNetwork;
var generate = require('./dataGenerator');

var frontEndData = [
  {
    emoticons: {'happy': 1},
    selected: {type: 'Chipotle'}
  },
  {
    emoticons: {'happy': 1},
    selected: {type: 'Chipotle'}
  },
  {
    emoticons: {'happy': 1},
    selected: {type: 'Chipotle'}
  },
  {
    emoticons: {'happy': 1},
    selected: {type: 'Chipotle'}
  },
  {
    emoticons: {'sad': 1},
    selected: {type: 'Chipotle'}
  },
  {
    emoticons: {'sad': 1},
    selected: {type: 'Pasta'}
  },
  {
    emoticons: {'sad': 1},
    selected: {type: 'Pasta'}
  },
  {
    emoticons: {'sad': 1},
    selected: {type: 'Pasta'}
  },
  {
    emoticons: {'happy': 1},
    selected: {type: 'Pasta'}
  },
  {
    emoticons: {'sad': 1},
    selected: {type: 'Expensive Wine'}
  }
];

var sampleNetwork = createNetwork(generate(200));
var moods = ['happy', 'sad', 'crying', 'lazy', 'energetic', 'drunk', 'nervous', 'tired', 'angry', 'sick', 'smug'];

// console.log(consultNetwork(sampleNetwork, {'sad': 1}));

// moods.forEach(mood => {
//   var a = {};
//   a[mood] = 1;
//   console.log(mood, consultNetwork(sampleNetwork, a));
// });

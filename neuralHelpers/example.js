var createNetwork = require('./neuralHelpers').createNetwork;
var consultNetwork = require('./neuralHelpers').consultNetwork;

var frontEndData = [
  {
    emoticons: {'Happy': 1},
    selected: {type: 'Mexican', keyword: 'Chipotle'}
  },
  {
    emoticons: {'Happy': 1},
    selected: {type: 'Mexican', keyword: 'Chipotle'}
  },
  {
    emoticons: {'Happy': 1},
    selected: {type: 'Mexican', keyword: 'Chipotle'}
  },
  {
    emoticons: {'Happy': 1},
    selected: {type: 'Mexican', keyword: 'Chipotle'}
  },
  {
    emoticons: {'Sad': 1},
    selected: {type: 'Mexican', keyword: 'Chipotle'}
  },
  {
    emoticons: {'Sad': 1},
    selected: {type: 'Italian', keyword: 'Pasta'}
  },
  {
    emoticons: {'Sad': 1},
    selected: {type: 'Italian', keyword: 'Pasta'}
  },
  {
    emoticons: {'Sad': 1},
    selected: {type: 'Italian', keyword: 'Pasta'}
  },
  {
    emoticons: {'Happy': 1},
    selected: {type: 'Italian', keyword: 'Pasta'}
  },
  {
    emoticons: {'Sad': 1},
    selected: {type: 'Romantic', keyword: 'Expensive Wine'}
  }
];

var sampleNetwork = createNetwork(frontEndData);

console.log(consultNetwork(sampleNetwork, {'Happy':1}));

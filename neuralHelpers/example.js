var createNetwork = require('./neuralHelpers').createNetwork;
var consultNetwork = require('./neuralHelpers').consultNetwork;

var frontEndData = [
  {
    mood: 'Happy',
    category: 'Chipotle'
  },
  {
    mood: 'Happy',
    category: 'Chipotle'
  },
  {
    mood: 'Happy',
    category: 'Chipotle'
  },
  {
    mood: 'Happy',
    category: 'Chipotle'
  },
  {
    mood: 'Sad',
    category: 'Chipotle'
  },
  {
    mood: 'Sad',
    category: 'Italian'
  },
  {
    mood: 'Sad',
    category: 'Italian'
  },
  {
    mood: 'Sad',
    category: 'Italian'
  },
  {
    mood: 'Happy',
    category: 'Italian'
  },
  {
    mood: 'Sad',
    category: 'Romantic'
  }
];

var sampleNetwork = createNetwork(frontEndData);

console.log(consultNetwork(sampleNetwork, 'Happy'));

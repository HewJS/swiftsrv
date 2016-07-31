let _ = require('lodash');
function generator(n) {
  let possibleMoods = ['happy', 'sad', 'crying', 'lazy', 'energetic', 'drunk', 'nervous', 'tired', 'angry', 'sick', 'smug'];
  let possibleTypes = ['Popular', 'Italian', 'Mexican', 'Desserts', 'Delivery', 'Juice bar', 'Fast food', 'Tea room', 'Coffee', 'Crabs', 'Soup', 'French', 'Pasta', 'Chipotle'];
  let conformalMap = {
    'happy': 'Mexican',
    'sad': 'Italian',
    'crying': 'Desserts',
    'lazy': 'Delivery',
    'energetic': 'Juice bar',
    'drunk': 'Fast food',
    'nervous': 'Tea room',
    'tired': 'Coffee',
    'angry': 'Crabs',
    'sick': 'Soup',
    'smug': 'French'
  };

  let result = [];

  for (let i = 0; i < n; i++){
    let entry = {
      emoticons: {},
      selected: { type: '' }
    };

    let len = randomN(2);
    _.shuffle(possibleMoods).slice(0, len).forEach((mood) => {
      entry.emoticons[mood] = 1;
      if (conform()) {
        entry.selected.type = conformalMap[mood];
      } else {
        entry.selected.type = possibleTypes[Math.floor(Math.random()*possibleTypes.length)];
      }
    });

    result.push(entry);
  }
  return result;
}

function randomN(n) {
  return Math.floor(Math.random() * n+1) + 1;
}

function conform() {
  // return true or false (conform to norm??)
  return (Math.random() < 0.8);
}

module.exports = generator;

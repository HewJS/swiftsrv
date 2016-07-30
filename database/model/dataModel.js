const mongoose = require('mongoose');

// Dataset will be a collection of data from the front end
// based on user input and the destination eventually `picked'
// Sample: {
//    emoticons: { smiley: 1, wink: 1, crying: 0, sad: 0 },
//    selected: { type: 'mexican', keyword: 'tacos' }
// }
// This can and will change

const dataSchema = new mongoose.Schema({
  emoticons: Object,
  selected: Object
});

const DataEntry = mongoose.model('DataEntry', dataSchema);

module.exports = { DataEntry };

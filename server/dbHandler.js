const db = require('../database/config');
const DataEntry = require('../database/model/dataModel');

const get = (req, res) => {
  DataEntry.find((err, users) => {
    res.send(200, users);
  });
};

const post = (req, res) => {
  const dataPoint = new DataEntry({
    emoticons: req.emoticons,
    selected: req.selected
  });
  dataPoint.save((err, datum) => {
    if (err) { console.error(err); }
    res.send(201, datum);
  });
};

module.exports = { get, post };

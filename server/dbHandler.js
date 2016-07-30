const db = require('../database/config');
const DataEntry = require('../database/model/dataModel');

const get = (req, res) => {
  DataEntry.find((err, users) => {
    res.status(200).send(users);
  });
};

const post = (req, res) => {
  const dataPoint = {
    emoticons: req.body.emoticons,
    selected: req.body.selected
  };
  DataEntry.create(dataPoint, (err, datum) => {
    if (err) { console.error(err); }
    res.status(201).send(datum);
  });
};

module.exports = { get, post };

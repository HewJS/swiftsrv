const db = require('../database/config');
const DataEntry = require('../database/model/dataModel');

const get = (req, res) => {
  DataEntry.find((err, data) => {
    res.status(200).send(data);
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

const create = (params) => {
  const dataPoint = {
    emoticons: params.emoticons,
    selected: params.term
  };
  Object.keys(dataPoint.emoticons).forEach(moodKey => dataPoint.emoticons[moodKey] = +dataPoint.emoticons[moodKey]);
  DataEntry.create(dataPoint, (err) => {
    if (err) { console.error(err); }
  });
};

const findAllAsync = (callback) => {
  DataEntry.find((err, data) => {
    if (!err) { callback(data); }
  });
};

module.exports = { get, post, create, findAllAsync };

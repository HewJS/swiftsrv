const expect = require('chai').expect;
const mongoose = require('mongoose');
const DataEntry = require('../database/model/dataModel');
const URI = 'mongodb://localhost/dbTest';

const clearDB = function(done) {
  mongoose.connection.db.dropDatabase(done);
};

describe('DataEntry', function() {

  // connect before tests
  before(function(done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(URI, done);
  });

  // clear db before test
  beforeEach(function(done) {
    clearDB(done);
  });

  it('should correctly add and get new entries', function(done) {
    const data = {
      'emoticons': { 'smiley': 0, 'wink': 1, 'crying': 0, 'sad': 0 },
      'selected': { 'type': 'japanese', 'keyword': 'sushi' }
    };

    DataEntry.create(data, (err, datum) => {
      if (!err) {
        DataEntry.find(datum, (err, result) => {
          expect(result.length === 1);
          expect(result[0].selected.type === 'japanese');
          done();
        });
      }
    });
  });

});

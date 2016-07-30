const mongoose = require('mongoose');

// TODO: change name of db to app's name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hewVar');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connection successful');
});

module.exports = db;

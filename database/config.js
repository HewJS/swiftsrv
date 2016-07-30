import mongoose from 'mongoose';

// TODO: change name of db to app's name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hewVar');

const db = mongoose.connection;
db.on('error', console.log('MongoDB connection failed'));
db.once('open', () => {
  console.log('MongoDB connection successful');
});

export { db };

var requestHandler = require('./requestHandler.js');
var path = require('path');
var dbHandler = require('./dbHandler.js');
//add other controllers here



module.exports = function (app, express){
  app.post('/api/getYelp', requestHandler.getYelp);

  app.get('/api/getUber', requestHandler.getUber);
  //app.post('/', requestHandler.someotherfn);
  app.get('/api/uberRedir', requestHandler.uberRedir);

  app.post('/api/uberPrice', requestHandler.uberPrice);

  app.post('/api/uberRide', requestHandler.uberRide);

  // db path for testing only, db will eventually work within
  // the above functions while they are doing their thing
  app.post('/api/db', dbHandler.post);
  app.get('/api/db', dbHandler.get);
  app.post('/api/brain', requestHandler.consult);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  });

};

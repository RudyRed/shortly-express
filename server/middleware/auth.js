const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.headers.cookies){

  } else {
    models.Sessions.create()
    .then( (session) => {
      return models.Sessions.get({id: session.insertId})
    })
    .then((session) => {
      req.session = session;
      next();
    })
    .catch( (err) =>{
      console.log(err);
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let session = models.Sessions;

  if (req.headers.cookie === undefined) {
    session.create()
      .then((data) =>
      session.get({id: data.insertId}))
      .then((data) => {
        console.log(data.user,'DDDDDDDDDDDDDDD')
        req.session = {
          hash: data.hash
        }
        //console.log(req.session,'UUUUUUUUUUUUUUUUUUU')
        res.cookie('shortlyid', data.hash);
        next();
      });
  } else {
    next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var session = models.Sessions;

  // if no cookie
  if (req.headers.cookie === undefined && JSON.stringify(req.cookies) === '{}' || !req.cookies) {
    session.create()
      .then((data) => {
        return session.get({id: data.insertId})})
      .then((data) => {
          req.session = {
            hash: data.hash
        }
        res.cookie('shortlyid', data.hash);
        next();
      });
  } else {
    // look up session using cookie hash
    models.Sessions.get({hash: req.cookies.shortlyid})
    .then((data) => {
      if (!data || !data.userId) {
        // if no session with that hash, make new session
        session.create()
          .then((data) => {
            return session.get({id: data.insertId})})
          .then((data) => {
              req.session = {
                hash: data.hash
            }
            res.cookie('shortlyid', data.hash);
            next();
          });
      } else {
        // if sessoion already exists, just add session to request
        var currentId = data.id;
        req.session = data
        res.cookie('shortlyid', data.hash);
        next();
      }
    })
    .catch(err => {
      console.log(err,'you done messed up');
      next();
    })
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

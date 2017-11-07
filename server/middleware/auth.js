const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var session = models.Sessions;

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
      })
      .catch(err => {
        console.log(err,'you done messed up')
      });
  } else {
    models.Sessions.get({hash: req.cookies.shortlyid})
    .then((data) => {
      if (!data || !data.userId) {
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
        var currentId = data.id;
        req.session = data
        res.cookie('shortlyid', data.hash);
        next();
      }
    })
    .catch(err => {
      console.log(err,'you done messed up')
    })
  }
};

//             UPDATE AN EXPIRED COOKIE I GUESS
// session.update({id: data.id}, {hash: 'hello my sql we got in a table'} )
//   .then((data) => {
//       return session.get({id: currentId})
//   })
//   .then((data) => {
//       req.session = {
//         hash: data.hash
//     }
//     res.cookie('shortlyid', data.hash);
//     next();
  // });









/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

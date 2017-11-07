const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var session = models.Sessions;

  if (req.headers.cookie === undefined && JSON.stringify(req.cookies) === '{}') {
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
    models.Sessions.get({hash: req.cookies.shortlyid})
    .then((data) => {
      console.log(data, 'rewvrhbfhjervfuervfeuhrgve')
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
        console.log(data, '4398509u208tu045')
        req.session = data
        res.cookie('shortlyid', data.hash);
        next();
      }
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

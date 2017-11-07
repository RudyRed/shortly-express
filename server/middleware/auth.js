const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

    req.session = models.Sessions.create({hash:'fcaecawefw'})



    // .then(() => {
    //   console.log(typeof session);
    //   // req.session = session;
    //   console.log(req.session, '=645=645=645=')
    // })
    // .catch( (err) =>{
    //   console.log(err);
    // });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

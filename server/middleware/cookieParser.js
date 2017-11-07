const parseCookies = (req, res, next) => {

  console.log(req.headers.cookie,'&&&&&&&&&&&&&&&&&&&&&&&');
  if (!req.headers.cookie) {
    next();
  } else {
    console.log(req)
    var cookie = req.headers.cookie.split(/=|; /g);
    // console.log(req)
    console.log(req.headers.cookie, 'HHEHRFWEHFHCHEFWHFHF')
    console.log(cookie, 'SPLIT COOKIE')

    for (var i = 0; i < cookie.length; i += 2) {
      req.cookies[cookie[i]] = cookie[i + 1];
    }

    next();
  }

};

module.exports = parseCookies;

const parseCookies = (req, res, next) => {
  if (!req.headers.cookie) {
    next();
  } else {

    var cookie = req.headers.cookie.split(/=|; /g);
    if (!req.cookies) {
      req.cookies = {};
    }
    for (var i = 0; i < cookie.length; i += 2) {
      req.cookies[cookie[i]] = cookie[i + 1];
      // console.log(req.cookies, "COOKIES LOOPS = upset stomache")
    }
    next();
  }
};

module.exports = parseCookies;

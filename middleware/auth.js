const jwt = require("jsonwebtoken");
// const config = require("config");

function auth(req, res, next) {
  // const token = req.header("x-auth-token");
  // if (!token) return res.status(401).send("Access denied. No token provided.");

  // try {
  //   const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(400).send("Invalid token.");
  // }
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;

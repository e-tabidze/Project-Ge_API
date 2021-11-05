const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log(decoded, "decoded auth midleware");

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;

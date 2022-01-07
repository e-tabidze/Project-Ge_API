const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({error: ex, message: "Invalid token."});
  }
}

module.exports = auth;

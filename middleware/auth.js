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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

module.exports = auth; 
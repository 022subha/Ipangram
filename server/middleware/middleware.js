const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenParts = token.split(" ");
  if (!token) {
    return res.sendStatus(401);
  }
  if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  }
};

module.exports = authenticateJWT;

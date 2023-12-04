const jsonwebtoken = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ message: "No authorization token provided!" });
  }
  try {
    const decoded = jsonwebtoken.verify(
      authorizationToken.split(" ")[1],
      process.env.JWT_SECRET
    );
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (e) {
    return res.status(400).json({ message: "Not authorized!" });
  }
};

module.exports = authentication;

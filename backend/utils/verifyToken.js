const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req?.signedCookies.user_auth || req?.cookies.user_auth;
  // const token=req.headers[`authorization`].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token found." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    } else {
      req.user = decoded;
      console.log("req.id in verifyToken:", req.user.userId);

       next();
    }
  });
};

module.exports = { verifyToken };

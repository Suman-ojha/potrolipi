
const jwt= require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.signedCookies.user_auth || req?.cookies.user_auth 
    console.log('in the verify token :',token);
    // const headers = req.headers[`authorization`];
    // const token = headers.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token found." });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
      console.log(user.userId);
      req.id = user.userId;
    });
    next();
  };
module.exports={verifyToken};
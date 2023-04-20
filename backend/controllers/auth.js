const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getRegistrationData = async (req, res) => {
  const { firstName, lastName, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).send("Passwords do not match");
  }
  const hashedPassword = await bcrypt.hash(password, 10); //salt=10
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Oop's!! User Already registered...Pls Login!!" });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const UserLogin = async (req, res) => {
  //sign the jwt tokens for user ..to authorize in the protected endpoints
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //generate the jwt token
    const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //set httpOnly Cookie
    res.cookie("user_auth", token, {
      httpOnly: true,
      secure: true, // set to true if you're using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
     
    });
    console.log('In the signin token '+req.cookies.user_auth);
    return res.status(200).json({
      message: "Successfully logged in.",
      user,
      token,
    });
  } catch (err) {
    console.log("login error => ", err);
    res.status(500).json({
      status: 0,
      res: err,
      error: "There was a server side error!",
    });
  }
};



// const verifyToken = (req, res, next) => {
//   const authHeader = req.signedCookies ||req.signedCookies.user_auth || req?.cookies?.user_auth || req.headers?.cookie;
//   console.log(authHeader)
//   if (authHeader) {
//       // const token = authHeader.split(" ")[1];
//       jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
//           if (err) res.status(403).json("Token is not valid!");
//           req.id = user.userId;
//           // console.log(user);
//           next();
//       });
//   } else {
//       return res.status(401).json("Unauthorized request!");
//   }
// };




const LogOut= async(req,res)=>{
  await res.clearCookie('user_auth');
  return res.status(200).json({message:"logout successfully"})
}
module.exports = {
  getRegistrationData,
  UserLogin,
  LogOut
};

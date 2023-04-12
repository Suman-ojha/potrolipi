const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getRegistrationData = async (req, res) => {
  const { firstName, lastName, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).send("Passwords do not match");
  }
  const hashedPassword = await bcrypt.hash(password, 10);//salt=10
  let existingUser;
  try {
    existingUser=await User.findOne({email:email});
  } catch (error) {
    console.log(error);
  }
  if(existingUser){
    return res.status(400).json({message:"Oop's!! User Already registered...Pls Login!!"})
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};


const UserLogin=async(req,res)=>{
  //sign the jwt tokens foir user ..to auithorize in the protected endpoints
  const { email, password } = req.body;

  // Check if user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  //verify the password
  const isMatch= await bcrypt.compare(password,user.password)
  if(!isMatch){
    return res.status(401).json({message:"invalid crendentials"})
  }
  //generate the jwt tokens
  const token=jwt.sign(
    {userId:user._id},
    process.env.JWT_SECRET,
    {expiresIn:'30s'}
    )
    
    //set httpOnly Cookie
    res.cookie(String(user._id),token,{
      path:'/',
      expiresIn:new Date(Date.now()+1000*30),
      httpOnly:true,
      samSite:"lax"
    })
    // res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({message:'Successfully Logged in.!!!' , user,token});
    // console.log(token);
    // return res.status(201).json({message:'Successfully Logged in.!!!'})
}

const verifyToken=(req,res,next)=>{
  const cookie1=req.headers.cookie;
  const token = cookie1.split('=')[1];
  console.log(token);
  if(!token){
    return res.status(404).json({message:"No tokens Found...."})
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
      return res.status(404).json({message:"Invalid Token."});
    }
    console.log(user.userId);
    req.id=user.userId;
  })
  next();
}
const UserDetails=async(req,res,next)=>{
  const UserId=req.id;
  let user;
  try {
    user=await User.findById(UserId,"-password");
  } catch (err) {
    return new Error(err)
  }
  if(!user){
    return res.status(404).json({message:"User not found...."})
  }
  return res.status(200).json({user});
}

module.exports = {
  getRegistrationData,
  UserLogin,
  verifyToken,
  UserDetails
};

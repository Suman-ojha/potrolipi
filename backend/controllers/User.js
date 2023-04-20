const User = require("../Models/User");

const UserDetails = async (req, res) => {

  const UserId = req.user.userId;
  let user;
  try {
    user = await User.findById(UserId, "-password").select("firstName lastName email");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found...." });
  }
  return res.json({ user });
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
      },
      {
        new: true,
      } 
    ).select("firstName lastName email");
    return res.status(200).json({updatedUser});
  } catch (err) {
    return next(err);
  }
};
module.exports = { UserDetails, updateUser };

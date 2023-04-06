const User = require("../Models/User");
const getRegistrationData = async (req, res) => {
  const { firstName, lastName, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).send("Passwords do not match");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getRegistrationData,
};

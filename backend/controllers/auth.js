// exports.users = (req, res) => {
//   const data = req.body;
//   res.json(data);
// };

const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
// const { expressjwt: jwt } = require("express-jwt");
const { expressjwt: expressjwt } = require("express-jwt");

exports.signup = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is taken" });
    }

    // Extract data from the request body
    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    // Create and save the new user
    const newUser = new User({ name, email, password, profile, username });
    await newUser.save();

    res.json({ message: "Signup success! Please signin." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error during signup. Please try again." });
  }
};

exports.signin = async (req, res) => {
  const { email: mail, password } = req.body;

  const user = await User.findOne({ email: mail });

  //   .exec((err, user) => {
  if (!user) {
    return res.status(400).json({
      error: "User with that email does not exist. Please signup.",
    });
  }
  // authenticate
  if (!user.authenticate(password)) {
    return res.status(400).json({
      error: "Email and password do not match.",
    });
  }
  // generate a token and send to client
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, { expiresIn: "1d" });
  const { _id, username, name, email, role } = user;
  return res.json({
    token,
    user: { _id, username, name, email, role },
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // Specify the algorithm used to sign the JWT
});

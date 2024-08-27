const { genSalt } = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, {
    expiresIn: "30d",
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User Already Exists" });
    }
    await User.create({
      username,
      email,
      password,
    });

    res.status(200).json({
      message: "User Created Successfully",
      token: generateToken(email),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res
        .status(200)
        .json({ message: "Login Successfull", token: generateToken(email) });
    } else {
      res.status(401).json({
        message: "Login failed",
        // token: generateToken(email),
      });
    }
  } catch (err) {
    res.send({ message: err.message }).status(400);
  }
};

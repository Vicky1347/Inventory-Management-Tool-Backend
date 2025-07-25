const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.json({ access_token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      message: 'User created',
      access_token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};


module.exports = { loginUser, registerUser };
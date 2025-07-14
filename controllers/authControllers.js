const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) =>{
    try {
        const { username, email, password, country } = req.body;
        const existingUser = await User.findOne({$or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, country});
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to Register' });
    }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { registerUser, loginUser };
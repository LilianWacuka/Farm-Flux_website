const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) =>{
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({$or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword});
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to Register' });
    }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { emailOrusername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrusername }, { username: emailOrusername }] });
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

const updatePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { registerUser, loginUser, updatePassword };
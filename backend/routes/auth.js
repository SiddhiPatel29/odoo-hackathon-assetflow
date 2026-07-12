const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔑 SIGNUP ENDPOINT
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation check
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Create user (role defaults to 'Employee' automatically via the schema)
    const newUser = new User({ name, email, password }); // Note: In production you'd hash the password, but keep it simple for time!
    await newUser.save();

    res.status(201).json({ 
      message: "Account created successfully as Employee.",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration.", error: err.message });
  }
});

// 🔓 LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both email and password." });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) { // Simple string comparison for hackathon speed
      return res.status(400).json({ message: "Invalid email or password parameters." });
    }

    if (user.status === 'Inactive') {
      return res.status(403).json({ message: "This account has been deactivated by an Administrator." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login.", error: err.message });
  }
});

module.exports = router;
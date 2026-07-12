const express = require('express');
const router = express.Router();

// A simple in-memory array to simulate a database for local testing
const mockedUsers = [];

// 🔑 SIGNUP ENDPOINT
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Check if user exists in our mocked array
    const existingUser = mockedUsers.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Create user (Forces role to 'Employee' strictly per contract)
    const newUser = {
      id: `mock_${Date.now()}`,
      name,
      email,
      password,
      role: 'Employee',
      status: 'Active'
    };
    
    mockedUsers.push(newUser);

    res.status(201).json({ 
      message: "Account created successfully as Employee (Mock Mode).",
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
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

    // Find user in mocked array
    const user = mockedUsers.find(u => u.email === email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password parameters." });
    }

    res.status(200).json({
      message: "Login successful (Mock Mode).",
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login.", error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Simple helper to find mock users from our auth memory pool if needed, 
// but we'll use local mock actions here to keep testing completely seamless.
router.get('/users', (req, res) => {
  res.json({
    message: "Fetched user directory successfully.",
    users: [
      { id: "mock_1", name: "Raj Patel", email: "raj@company.com", role: "Employee", status: "Active" },
      { id: "mock_2", name: "Priya Sharma", email: "priya@company.com", role: "Asset Manager", status: "Active" },
      { id: "mock_3", name: "Siddh", email: "siddh@assetflow.com", role: "Admin", status: "Active" }
    ]
  });
});

// 📈 1. ELEVATE USER ROLE
router.patch('/users/update-role', (req, res) => {
  try {
    const { userId, targetRole } = req.body;
    
    // Allowed roles restriction check
    const validRoles = ['Admin', 'Asset Manager', 'Department Head', 'Employee'];
    if (!validRoles.includes(targetRole)) {
      return res.status(400).json({ message: "Invalid system role type provided." });
    }

    res.status(200).json({
      message: `User role successfully updated to ${targetRole}.`,
      updatedUser: { id: userId, role: targetRole }
    });
  } catch (err) {
    res.status(500).json({ message: "Role elevation failed.", error: err.message });
  }
});

// 🔒 2. DEACTIVATE / TOGGLE USER STATUS
router.patch('/users/toggle-status', (req, res) => {
  try {
    const { userId, currentStatus } = req.body;
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    res.status(200).json({
      message: `User accounts status changed to ${nextStatus}.`,
      updatedUser: { id: userId, status: nextStatus }
    });
  } catch (err) {
    res.status(500).json({ message: "Status toggle failed.", error: err.message });
  }
});

module.exports = router;
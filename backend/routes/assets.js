const express = require('express');
const router = express.Router();

// Simple in-memory storage for hackathon runtime speed
const mockedAssets = [];
const mockedBookings = [];

// ==========================================
// 📋 1. REGISTER NEW ASSET
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { name, category, serialNumber, acquisitionDate, acquisitionCost, location, isSharedBookable } = req.body;

    const assetTag = `AF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAsset = {
      id: `asset_${Date.now()}`,
      name, category, assetTag, serialNumber, acquisitionDate, 
      acquisitionCost, location, isSharedBookable, status: 'Available'
    };

    mockedAssets.push(newAsset);
    res.status(201).json({ message: "Asset registered successfully (Mock Mode).", asset: newAsset });
  } catch (err) {
    res.status(500).json({ message: "Error registering asset.", error: err.message });
  }
});

// ==========================================
// 🤝 2. ALLOCATE ASSET WITH CONFLICT HANDLING
// ==========================================
router.post('/allocate', async (req, res) => {
  try {
    const { assetId, allocatedToUser } = req.body;
    const asset = mockedAssets.find(a => a.id === assetId || a.assetTag === assetId);

    if (!asset) return res.status(404).json({ message: "Asset not found." });

    if (asset.status !== 'Available') {
      return res.status(400).json({
        message: `Conflict: This asset is currently not available. Status: ${asset.status}`,
        offerTransfer: true
      });
    }

    asset.status = 'Allocated';
    asset.currentHolder = allocatedToUser;

    res.status(200).json({ message: "Asset allocated successfully (Mock Mode).", asset });
  } catch (err) {
    res.status(500).json({ message: "Allocation error.", error: err.message });
  }
});

// ==========================================
// 🕒 3. RESOURCE TIME-SLOT OVERLAP VALIDATION
// ==========================================
router.post('/book', async (req, res) => {
  try {
    const { assetId, bookedBy, startTime, endTime } = req.body;
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    // Overlap validation check in memory
    const dynamicOverlapCheck = mockedBookings.find(b => 
      b.assetId === assetId &&
      new Date(b.startTime) < newEnd && 
      new Date(b.endTime) > newStart
    );

    if (dynamicOverlapCheck) {
      return res.status(400).json({ 
        message: "Time slot conflict! Two people cannot book the same resource at overlapping times."
      });
    }

    const newBooking = {
      id: `book_${Date.now()}`,
      assetId, bookedBy, startTime: newStart, endTime: newEnd, status: 'Upcoming'
    };
    mockedBookings.push(newBooking);

    res.status(201).json({ message: "Resource booked successfully (Mock Mode)!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Booking process failed.", error: err.message });
  }
});

module.exports = router;
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

// ==========================================
// 🔍 4. GLOBAL SEARCH AND LIVE INVENTORY FILTERS
// ==========================================
router.get('/inventory', (req, res) => {
  try {
    // 💡 Pre-populating some dummy assets so the frontend has data to display immediately
    const sampleInventory = [
      { id: "asset_1", name: "MacBook Pro 16", category: "Electronics", assetTag: "AF-1092", serialNumber: "SN99283", status: "Available", location: "HQ-Floor 1" },
      { id: "asset_2", name: "Dell UltraSharp Monitor", category: "Electronics", assetTag: "AF-4402", serialNumber: "SN44102", status: "Allocated", location: "Remote" },
      { id: "asset_3", name: "Conference Room B", category: "Spaces", assetTag: "AF-8819", serialNumber: "ROOM-B", status: "Reserved", location: "HQ-Floor 2" },
      { id: "asset_4", name: "Ergonomic Office Chair", category: "Furniture", assetTag: "AF-3021", serialNumber: "SN55219", status: "Under Maintenance", location: "HQ-Floor 1" }
    ];

    // Grab query parameters from the URL (e.g., ?search=MacBook&status=Available)
    const { search, status, category } = req.query;
    let filteredResults = [...sampleInventory];

    // 🏎️ Apply live text filtering (Checks Name or Asset Tag)
    if (search) {
      filteredResults = filteredResults.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.assetTag.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷️ Apply exact match status filtering
    if (status) {
      filteredResults = filteredResults.filter(item => item.status === status);
    }

    // 🗂️ Apply category filtering
    if (category) {
      filteredResults = filteredResults.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      count: filteredResults.length,
      assets: filteredResults
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory.", error: err.message });
  }
});

module.exports = router;
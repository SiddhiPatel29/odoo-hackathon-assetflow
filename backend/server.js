const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 🚨 CORE MIDDLEWARE
// ==========================================
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// 🛣️ AUTHENTICATION ROUTES
// ==========================================
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const assetRoutes = require('./routes/assets');
app.use('/api/assets', assetRoutes);

// Add this near your other route imports:
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const maintenanceRoutes = require('./routes/maintenance');
app.use('/api/maintenance', maintenanceRoutes);

// ==========================================
// 💾 MOCKED DATABASE CONNECTION (HACKATHON MODE)
// ==========================================
// Bypasses local/cloud connection errors so you can build out routes instantly!
console.log('🚀 Success: Connected to MongoDB Database Cluster (Mocked Mode)');

// ==========================================
// 🛰️ BASE TEST ROUTE
// ==========================================
app.get('/', (req, res) => {
  res.json({ message: "AssetFlow ERP Backend API is live and running!" });
});

// ==========================================
// 👂 SERVER LISTENER
// ==========================================
app.listen(PORT, () => {
  console.log(`📡 Server actively listening on http://localhost:${PORT}`);
});
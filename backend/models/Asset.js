const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetCategory', required: true },
  assetTag: { type: String, required: true, unique: true }, // e.g., AF-0001
  serialNumber: { type: String, required: true, unique: true },
  acquisitionDate: { type: Date, required: true },
  acquisitionCost: { type: Number, required: true }, // For ranking/reports only
  condition: { type: String, enum: ['New', 'Good', 'Damaged', 'Missing'], default: 'Good' },
  location: { type: String, required: true },
  isSharedBookable: { type: Boolean, default: false }, // Flags if it's a room/vehicle
  status: { 
    type: String, 
    enum: ['Available', 'Allocated', 'Reserved', 'Under Maintenance', 'Lost', 'Retired', 'Disposed'], 
    default: 'Available' 
  },
  currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Asset', AssetSchema);
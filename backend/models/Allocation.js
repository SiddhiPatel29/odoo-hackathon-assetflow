const mongoose = require('mongoose');

const AllocationSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  allocatedToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  allocatedToDept: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  expectedReturnDate: { type: Date },
  actualReturnDate: { type: Date, default: null },
  notes: { type: String },
  transferRequest: {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['None', 'Pending', 'Approved', 'Rejected'], default: 'None' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Allocation', AllocationSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  role: { 
    type: String, 
    enum: ['Admin', 'Asset Manager', 'Department Head', 'Employee'], 
    default: 'Employee' // 🚨 Crucial: Enforces non-self-elevating signups
  },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
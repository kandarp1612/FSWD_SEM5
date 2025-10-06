const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 1 },
  className: { type: String, trim: true },
  parentEmail: { type: String, trim: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);

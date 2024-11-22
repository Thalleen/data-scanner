const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  base64Image:{type:String, required:true},
  detectedFields: { type: Object, required: true },
  classification: { type: String, required: true }, // This is causing the error
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scan', scanSchema);



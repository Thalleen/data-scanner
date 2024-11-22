const express = require('express');
const multer = require('multer');
const { uploadFile, getAllScans, deleteScan } = require('../controllers/scanController');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// File Upload Route
router.post('/upload', upload.single('file'), uploadFile);

// Get All Scans
router.get('/', getAllScans);

// Delete a Scan
router.delete('/:id', deleteScan);

module.exports = router;



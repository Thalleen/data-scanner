const Scan = require('../models/ScanModel');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const { scanner, classifyData } = require('../utils/scanner'); 

// Upload a file for scanning
exports.uploadFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const filePath = req.file.path;

      const base64Image = convertBase64(filePath);
  
      // Perform OCR on the uploaded image
      const { data: { text } } = await Tesseract.recognize(filePath);
      console.log('Extracted text from image:', text);

  
      if (!text.trim()) {
        return res.status(400).json({ error: 'No text detected in the image' });
      }
  
      // Scan extracted text for sensitive data
      const scanResults = scanner(text);
    
      // Classify the data
      const classification = classifyData(scanResults);

  
      // Save results to the database
      const newScan = new Scan({
        fileName: req.file.originalname,
        base64Image:base64Image,
        detectedFields: scanResults,
        classification, // Ensure this is not undefined
      });
  
      await newScan.save();

      fs.unlinkSync(filePath);
  
      res.status(201).json({
         message: 'Image processed, text scanned, and saved successfully',
        scan: newScan,
      });
    } catch (error) {
      console.error('Error during processing:', error.message);
      res.status(500).json({ error: 'Error processing image', details: error.message });
    }
  };
  

  
  
// Get all scans
exports.getAllScans = async (req, res) => {
  try {
    const scans = await Scan.find();
    res.status(200).json(scans);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving scans' });
  }
};

// Delete a scan
exports.deleteScan = async (req, res) => {
  try {
    const { id } = req.params;
    await Scan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Scan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting scan' });
  }
};



const convertBase64 = (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    throw new Error(`Failed to convert file to Base64: ${error.message}`);
  }
};

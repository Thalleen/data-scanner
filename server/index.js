require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const scanRoutes = require('./routes/scanRoutes');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/scans', scanRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Test Route
app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


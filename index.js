require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const fetchAndStoreCryptoData = require('./src/job/fetchCryptoData');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

fetchAndStoreCryptoData();

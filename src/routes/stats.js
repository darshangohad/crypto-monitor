const express = require('express');
const router = express.Router();
const { getCryptoStats, getCryptoDeviation } = require('../controllers/statsController');

router.get('/stats', getCryptoStats);

router.get('/deviation', getCryptoDeviation);

module.exports = router;

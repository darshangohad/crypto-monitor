const express = require('express');
const router = express.Router();
const { getCryptoStats } = require('../controllers/statsController');

router.get('/stats', getCryptoStats);

module.exports = router;

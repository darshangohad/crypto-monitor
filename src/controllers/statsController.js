const Crypto = require('../models/Crypto');

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const cryptoData = await Crypto.findOne({ name: coin }).sort({updatedAt: -1}).limit(1);

    if (!cryptoData) {
      return res.status(404).json({ error: 'Data not found.' });
    }

    const response = {
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      '24hChange': cryptoData.change24h,
      updatedAt: cryptoData.updatedAt,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const calculateStandardDeviation = (prices) => {
  const n = prices.length;
  const mean = prices.reduce((sum, price) => sum + price, 0) / n;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / n;
  return Math.sqrt(variance);
};

const getCryptoDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter.' });
  }

  try {
    const records = await Crypto.find({ name: coin })
      .sort({ updatedAt: -1 })
      .limit(100)
      .select('price');

    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
    }

    const prices = records.map(record => record.price);

    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(4)) });
  } catch (error) {
    console.error('Error fetching deviation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCryptoStats, getCryptoDeviation };
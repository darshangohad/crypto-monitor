const Crypto = require('../models/Crypto');

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const cryptoData = await Crypto.findOne({ name: coin });

    if (!cryptoData) {
      return res.status(404).json({ error: 'Data not found.' });
    }

    const response = {
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      '24hChange': cryptoData.change24h,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCryptoStats };

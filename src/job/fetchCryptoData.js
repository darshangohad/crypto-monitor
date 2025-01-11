const schedule = require('node-schedule');
const fetchCryptoData = require('../service/coinGeckoService');
const Crypto = require('../models/Crypto');

const fetchAndStoreCryptoData = async () => {
  const coinIds = ['bitcoin', 'matic-network', 'ethereum'];
  try {
    const data = await fetchCryptoData(coinIds);

    // console.log(data);

    for (const [id, info] of Object.entries(data)) {
      const crypto = {
        name: id,
        symbol: id.split('-')[0].toUpperCase(),
        price: info.usd,
        marketCap: info.usd_market_cap,
        change24h: info.usd_24h_change,
      };

    // console.log("Crypto data -->> ", crypto);

      // await Crypto.findOneAndUpdate(
      //   { name: crypto.name },
      //   { ...crypto, updatedAt: new Date() },
      //   { upsert: true }
      // );
      await Crypto.insertMany(crypto);
    }

    console.log('Crypto data updated successfully at ', Date());
  } catch (error) {
    console.error('Error updating crypto data:', error.message);
  }
};

// Schedule job to run every 2 hours
schedule.scheduleJob('0 */2 * * *', fetchAndStoreCryptoData);

module.exports = fetchAndStoreCryptoData;

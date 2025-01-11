const axios = require('axios');

const fetchCryptoData = async (coinIds) => {
  const url = `https://api.coingecko.com/api/v3/simple/price`;
  try {
    const { data } = await axios.get(url, {
      params: {
        ids: coinIds.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    // console.log("Mydata -> ", data);
    return data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
    throw error;
  }
};

module.exports = fetchCryptoData;
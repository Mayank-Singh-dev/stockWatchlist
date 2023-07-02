
import axios from 'axios';

export const fetchStockData = async (symbol) => {
  const apiKey = 'LI5QJPW4G9U51BFF';
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
export const fetchSymbolSearch = async (keywords) => {
  const apiKey = 'LI5QJPW4G9U51BFF';
  const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const bestMatches = response.data.bestMatches.map((match) => match['1. symbol']);
    return bestMatches;
  } catch (error) {
    console.error('Error fetching symbol search data:', error);
    throw error;
  }
};
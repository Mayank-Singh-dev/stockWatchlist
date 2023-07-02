
import axios from 'axios';

export const FETCH_STOCK_DATA_SUCCESS = 'FETCH_STOCK_DATA_SUCCESS';
export const FETCH_STOCK_DATA_FAILURE = 'FETCH_STOCK_DATA_FAILURE';
export const SET_SELECTED_STOCK = 'SET_SELECTED_STOCK';
export const SET_SYMBOL_SEARCH_RESULTS = 'SET_SYMBOL_SEARCH_RESULTS';

export const fetchStockData = (symbol) => {
  const apiKey = 'LI5QJPW4G9U51BFF';
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${apiKey}`;

  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      dispatch(setStockData(data));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      dispatch(setError(error));
    }
  };
};

export const fetchSymbolSearch = (keywords) => {
  const apiKey = 'LI5QJPW4G9U51BFF';
  const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;

  return async (dispatch) => {
    try {
      const response = await axios.get(apiUrl);
      const bestMatches = response.data.bestMatches.map((match) => match['1. symbol']);
      dispatch(setSymbolSearchResults(bestMatches));
      return bestMatches; 
    } catch (error) {
      console.error('Error fetching symbol search data:', error);
      dispatch(setError(error));
      throw error; 
    }
  };
};

export const setStockData = (stockData) => {
  return {
    type: FETCH_STOCK_DATA_SUCCESS,
    payload: stockData,
  };
};

export const setError = (error) => {
  return {
    type: FETCH_STOCK_DATA_FAILURE,
    payload: error,
  };
};

export const setSelectedStock = (stockData) => {
  return {
    type: SET_SELECTED_STOCK,
    payload: stockData,
  };
};

export const setSymbolSearchResults = (results) => {
  return {
    type: SET_SYMBOL_SEARCH_RESULTS,
    payload: results,
  };
};



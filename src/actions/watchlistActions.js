
export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';
export const SET_SELECTED_STOCK = 'SET_SELECTED_STOCK';

export const addToWatchlist = (symbol) => {
  return {
    type: ADD_TO_WATCHLIST,
    payload: symbol
  };
};

export const removeFromWatchlist = (symbol) => {
  return {
    type: REMOVE_FROM_WATCHLIST,
    payload: symbol
  };
};

export const setSelectedStock = (stockData) => {
  return {
    type: SET_SELECTED_STOCK,
    payload: stockData
  };
};

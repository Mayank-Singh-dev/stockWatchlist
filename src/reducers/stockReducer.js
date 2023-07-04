
import {
  FETCH_STOCK_DATA_SUCCESS,
  FETCH_STOCK_DATA_FAILURE,
  SET_SELECTED_STOCK,
  SET_SYMBOL_SEARCH_RESULTS 
} from '../actions/stockActions';

const initialState = {
  stockData: null,
  error: null,
  selectedStock: null,
  symbolSearchResults: [] 
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCK_DATA_SUCCESS:
      return {
        ...state,
        stockData: action.payload,
        error: null
      };
    case FETCH_STOCK_DATA_FAILURE:
      return {
        ...state,
        stockData: null,
        error: action.payload
      };
    case SET_SELECTED_STOCK:
      return {
        ...state,
        selectedStock: action.payload
      };
    case SET_SYMBOL_SEARCH_RESULTS:
      return {
        ...state,
        symbolSearchResults: action.payload
      };
    default:
      return state;
  }
};

export default stockReducer;
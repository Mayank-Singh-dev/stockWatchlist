
import {
    ADD_TO_WATCHLIST,
    REMOVE_FROM_WATCHLIST,
    SET_SELECTED_STOCK
  } from '../actions/watchlistActions';
  
  const initialState = {
    watchlist: [],
    selectedStocks: [] // Change the name to selectedStocks and initialize as an array
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_WATCHLIST:
        return {
          ...state,
          watchlist: [...state.watchlist, action.payload]
        };
      case REMOVE_FROM_WATCHLIST:
        return {
          ...state,
          watchlist: state.watchlist.filter((symbol) => symbol !== action.payload),
          selectedStocks: state.selectedStocks.filter((symbol) => symbol !== action.payload) // Remove the selected stock symbol from selectedStocks array as well
        };
        case SET_SELECTED_STOCK:
            return {
              ...state,
              selectedStocks: [...state.selectedStocks, action.payload],
            };
      default:
        return state;
    }
  };
  
  export default watchlistReducer;
    

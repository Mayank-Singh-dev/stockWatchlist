import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import stockReducer from './reducers/stockReducer';
import watchlistReducer from './reducers/watchlistReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  watchlist: watchlistReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

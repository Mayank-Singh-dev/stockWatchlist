

import React from 'react';
import { connect } from 'react-redux';
import './Watchlist.css';
import { removeFromWatchlist } from '../../actions/watchlistActions';

const WatchList = ({ watchlist, selectedStocks, removeFromWatchlist }) => {
  const handleRemoveFromWatchlist = (symbol) => {
    removeFromWatchlist(symbol);
  };

  return (
    <div className="WatchList">
      <div className="watchHead">Stocks you kept an eye on...</div>

      <div className="WatchlistCards">
        {watchlist.map((symbol) => {
          const stockInfo = selectedStocks.find(
            (stock) => stock['Meta Data']['2. Symbol'] === symbol
          );

          const timeSeries = stockInfo && stockInfo['Time Series (60min)'];
          const firstDataPoint = timeSeries && Object.values(timeSeries)[0];
          const openingPrice = firstDataPoint && firstDataPoint['1. open'];
          const highestPrice = firstDataPoint && firstDataPoint['2. high'];
          const lowestPrice = firstDataPoint && firstDataPoint['3. low'];
          const volume = firstDataPoint && firstDataPoint['5. volume'];

          return (
            <div key={symbol} className="WatchlistCard">
              {stockInfo && (
                <div className="stockInfos">
                  <div>Name: {symbol}</div>
                  <div>Time-Zone: {stockInfo['Meta Data']['6. Time Zone']}</div>
                  <div>Opening Price: {openingPrice}</div>
                  <div>Highest Price: {highestPrice}</div>
                  <div>Lowest Price: {lowestPrice}</div>
                  <div>Volume: {volume}</div>
                  <button
                    className="removeButton"
                    onClick={() => handleRemoveFromWatchlist(symbol)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.watchlist.watchlist,
  selectedStocks: state.watchlist.selectedStocks,
});

const mapDispatchToProps = {
  removeFromWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);

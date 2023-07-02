import React from 'react';
import { connect } from 'react-redux';
import LineChart from './Linechart';
import { addToWatchlist, removeFromWatchlist, setSelectedStock } from '../../actions/watchlistActions';
import './Home.css';

const StockCard = ({ stockData, watchlist, addToWatchlist, removeFromWatchlist, setSelectedStock }) => {
  if (!stockData || !stockData['Meta Data']) {
    return <div>Loading...</div>;
  }

  const { 'Meta Data': metaData, 'Time Series (60min)': timeSeries } = stockData;

  const timeZone = metaData['6. Time Zone'];
  const symbol = metaData['2. Symbol'];

  if (!timeSeries) {
    return <div>No data available.</div>;
  }

  const timeSeriesKeys = Object.keys(timeSeries);
  const firstObjectKey = timeSeriesKeys[0];
  const firstObjectData = timeSeries[firstObjectKey];
  const {
    '1. open': open,
    '2. high': high,
    '3. low': low,
    '4. close': close,
    '5. volume': volume
  } = firstObjectData;

  const handleAddToWatchlist = () => {
    addToWatchlist(symbol);
    handleSelectStock();
  };
  const handleRemoveFromWatchlist = () => {
    removeFromWatchlist(symbol);
    handleSelectStock();
  };
  
  const handleSelectStock = () => {
    setSelectedStock(stockData);
  };

  const isWatched = watchlist.includes(symbol);

  return (
    <div className="stocksData">
      <div className="stockCard">
        <div className="stockImage">
          <LineChart stockData={stockData} />
        </div>
        <div className="stockInfo">
          <div>Name: {symbol}</div>
          <div>Time-Zone: {timeZone}</div>
          <div>Opening Price: {open}</div>
          <div>Closing Price: {close}</div>
          <div>Highest Price: {high}</div>
          <div>Lowest Price: {low}</div>
          <div className="StockPrice">Volume: {volume}</div>
          <button className='stockButton'  onClick={isWatched ? handleRemoveFromWatchlist : handleAddToWatchlist}>
            {isWatched ? 'Remove' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.watchlist.watchlist,
});

const mapDispatchToProps = {
  addToWatchlist,
  removeFromWatchlist,
  setSelectedStock
};

export default connect(mapStateToProps, mapDispatchToProps)(StockCard);


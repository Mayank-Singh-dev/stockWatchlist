
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchStockData, fetchSymbolSearch } from '../../actions/stockActions';
import StockCard from './StockCard';
import './Home.css';

const Home = ({ stockData, error, fetchStockData, fetchSymbolSearch }) => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [bestMatches, setBestMatches] = useState([]);

  const handleSearch = () => {
    if (searchSymbol.trim() !== '') {
      fetchStockData(searchSymbol);
    }
  };

  const handleSymbolSearch = async (symbol) => {
    setSearchSymbol(symbol);

    if (symbol.trim() !== '') {
      const matches = await fetchSymbolSearch(symbol);
      setBestMatches(matches);
    } else {
      setBestMatches([]);
    }
  };

  const handleInputChange = (event) => {
    const symbol = event.target.value.toUpperCase();
    setSearchSymbol(symbol);
    handleSymbolSearch(symbol);
  };

  const handleDropdownItemClick = (symbol) => {
    setSearchSymbol(symbol);
    setBestMatches([]);
  };

  return (
    <div className="Home">
      <div className="searchInput">
        <input
          id="searchInput"
          className="navInput"
          placeholder="Search Stock by Symbol"
          type="text"
          value={searchSymbol}
          onChange={handleInputChange}
        />
        <button className="navbutton" onClick={handleSearch}>
          Search
        </button>
      </div>

      {bestMatches.length > 0 && (
        <div className="dropdownContainer">
          <ul className="dropdownList">
            {bestMatches.map((match) => (
              <li key={match} onClick={() => handleDropdownItemClick(match)}>
                {match}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error ? (
        <div>Error fetching stock data: {error.message}</div>
      ) : stockData ? (
        <StockCard stockData={stockData} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stockData: state.stock.stockData,
  error: state.stock.error,
});

const mapDispatchToProps = {
  fetchStockData,
  fetchSymbolSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

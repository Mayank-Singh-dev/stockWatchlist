import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import Home from './components/home/Home';
import WatchList from './components/watchlist/WatchList';
import Header from './components/header/Header';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

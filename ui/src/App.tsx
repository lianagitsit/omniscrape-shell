import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useFetch from './useFetch';

function App() {
  const { data, loading } = useFetch("http://localhost:8080/api");

  return (
    <div className="App">
      <header className="App-header">
        {loading && (
          <p>Loading</p>
        )}
        {!loading && (
          <div>
            <p>Site: {data.pageTitle}</p>
            <p>Deck: {data.deckName}</p>
            <p>Price: {data.price}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

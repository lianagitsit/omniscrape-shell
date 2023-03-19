import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useFetch from './useFetch';

function App() {
  const {data} = useFetch("http://localhost:8080/api");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data.message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

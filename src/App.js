import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import React, { Component, useEffect } from 'react';
import { store } from "./Redux/store";
import { NetworkChanged } from './Services/web3Connection';
// import img from "./background.jpg"
// import img from "../public/images/svg/background.jpg"

function App() {
  const [Connect, setConnect] = React.useState(false);

  return (
    <div className="App">
      <Home setConnect={setConnect} Connect={Connect} />
    </div>
  );
}

export default App;

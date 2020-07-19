import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css'
import Codemirror_Component from './Components/Codemirror_Component';
import NavbarComponent from './Components/NavbarComponent';



function App() {
  return (
    <div className="App">
    <NavbarComponent/>
    <Codemirror_Component/>
    </div>
  );
}

export default App;

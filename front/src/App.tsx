import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Signup from './Auth/Signup';

function App() {

  sessionStorage.setItem('accessToken', "");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <div>
            <Link className="App-link" to="/auth/login">Log in</Link>
          </div>
          <div>
            <Link className="App-link" to="/auth/signup">Register</Link>
          </div>
          <div>
          </div>
          <div>
            You are not logged in.
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
// src/App.js
import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Healthy Living Quiz</h1>
      </div>
      <Quiz />
    </div>
  );
}

export default App;

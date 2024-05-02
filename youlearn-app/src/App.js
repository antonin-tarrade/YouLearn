import './App.css';
import Header from './Header';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/YouLearn/Servlet?${Date.now}`)
      .then(response => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <h1>{message}</h1>
      <main>

      </main>
    </div>
  );
}

export default App;

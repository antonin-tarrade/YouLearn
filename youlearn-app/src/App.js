import './App.css';
import Header from './Header';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import FrontPage from './FrontPage';



function App() {
  const [message, setMessage] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSignIn = (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
    setUserEmail(email);
    setIsSignedIn(true);
  };

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
      <Header isSignedIn={isSignedIn} userEmail={userEmail} /> 
      <FrontPage isSignedIn={isSignedIn} onSignIn={handleSignIn} userEmail={userEmail}/>
    </div>
  );
}

export default App;

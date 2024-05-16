import './App.css';
import React, { useState, useEffect } from 'react';

// import axios from 'axios';
import WelcomePage from './WelcomePage';



function App() {
  // const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [userId, setUserId] = useState('');

  const handleLogIn = (userId, password) => {
    console.log(`Id: ${userId}, Password: ${password}`);
    setIsSignedIn(true);
    setUserId(userId);
  };

  const handleSignIn = (userId, userEmail,password) => {
    console.log(`Id: ${userId}, Email: ${userEmail}, Password: ${password}`);
    setUserEmail(userEmail);
    setUserId(userId);
  };

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/YouLearn/Servlet?${Date.now}`)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  return (
    <div className="App">
      <WelcomePage onLogIn={handleLogIn} onSignin={handleSignIn} userId={userId} isSignedIn={isSignedIn}/>
    </div>
  );
}

export default App;

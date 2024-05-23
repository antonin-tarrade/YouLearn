import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import LogInForm from './LoginForm';
import axios from 'axios';
import VideoPage from './VideoPage';
import HomePage from './HomePage';
import { userExample, videoExample } from './data';


function App() {
  const [user, setUser] = useState({
    username : '',
    email : '',
    password : '',
    role : null,
  });
  const [userEmail, setUserEmail] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const onLogIn = (user) => {
    console.log(`Id: ${user.username}, Password: ${user.password}`);
    setIsSignedIn(true);
    setUserId(user.username);
  };

  const onSignIn = (userId, userEmail,password) => {
    console.log(`Id: ${userId}, Email: ${userEmail}, Password: ${password}`);
    setUserEmail(userEmail);
    setUserId(userId);
  };

  return (
    <div className="App">
      <Header userId={userId}/>
      {!isSignedIn ? 
        <LogInForm onLogIn ={onLogIn} onSignIn={onSignIn} user={user} setUser={setUser}/> : 
        <div>
            <HomePage user={user}/>
        </div>
      }
    </div>
  );
}

export default App;

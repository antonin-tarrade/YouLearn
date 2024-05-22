import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import LogInForm from './LoginForm';
import axios from 'axios';
import Homepage from './Homepage';

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
      {!isSignedIn ? 
        <LogInForm onLogIn ={onLogIn} onSignIn={onSignIn} user={user} setUser={setUser}/> : 
      
        <div>
            <Header userId={userId}/>
            <Homepage user={user}/>
        </div>
      }
    </div>
  );
}

export default App;

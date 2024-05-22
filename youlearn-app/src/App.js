import './App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import WelcomePage from './WelcomePage';
import VideoPage from './VideoPage';
import Header from "./Header";


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

  const commentsExample = [
    { id: 1, content: 'Super vidéo !', author: 'Jean Dupont'},
    { id: 2, content: 'Merci pour cette vidéo !', author: 'Marie Martin'},
    { id: 3, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'},
    { id: 4, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'},
    { id: 5, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'},
    { id: 6, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'},
    { id: 7, content: 'Je n\'ai pas compris la fin...', author: 'Pierre Durand'}
  ];

  const videoExample = {
    title: 'Les flexbox',
    description: 'Dans ce cours approfondi, vous découvrirez toutes les fonctionnalités clés de CSS. Il s\'agit du cours CSS le plus complet que nous ayons publié à ce jour. Donc, si vous souhaitez devenir un expert des feuilles de style en cascade, ce cours est fait pour vous.',
    url: 'https://www.youtube.com/embed/OXGznpKZ_sA?autoplay=1',
    numberOfLike: 3149,
    cour: 'CSS',
    author: 'Pierre Giraud',
    comments : commentsExample
  };

  return (
    <div className="App">   
      <Header userId={userId} isSignedIn={isSignedIn}/>
      <VideoPage video={videoExample}/>
    </div>
  );
}

export default App;

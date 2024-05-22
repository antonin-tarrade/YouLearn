import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import LogInForm from './LoginForm';
import axios from 'axios';
import VideoPage from './VideoPage';
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
      {!isSignedIn ? 
        <LogInForm onLogIn ={onLogIn} onSignIn={onSignIn} user={user} setUser={setUser}/> : 
      
        <div>
            <Header userId={userId}/>
            <Homepage user={user}/>
            <VideoPage video={videoExample}/>
        </div>
      }
    </div>
  );
}

export default App;

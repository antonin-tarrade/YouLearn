import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useUser } from './UserContext';
import Header from './pages/Header';
import LogInForm from './pages/LogInForm';
import VideoPage from './pages/VideoPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {

  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="App">
      {isSignedIn ? <Header /> : null}
        <Routes>
          <Route path="/login" element={<LogInForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/video" element={<VideoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

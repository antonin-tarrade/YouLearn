import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';

import Header from './pages/Header';
import LogInForm from './pages/LogInForm';
import VideoPage from './pages/VideoPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import CoursePage from './pages/CoursePage';
import PlaylistPage from './pages/PlaylistPage';
import CreateCourse from './pages/CreateCourse';
import CreatePlaylist from './pages/CreatePlaylist';
import SearchResultPage from './pages/SearchResultPage';

import './App.css';

function App() {

  const topSpace = <div className='top-bar-spacer'></div>;

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<LogInForm />} />
            <Route path="/" element={<div> {topSpace} <HomePage /></div>} />
            <Route path="/user" element={<div> {topSpace} <UserPage /></div>} />
            <Route path="/video" element={<div> {topSpace} <VideoPage /></div>} />
            <Route path="/course" element={<div> {topSpace} <CoursePage /></div>} />
            <Route path="/playlist" element={<div> {topSpace} <PlaylistPage /></div>} />
            <Route path="/createcourse" element={<div> {topSpace} <CreateCourse /></div>} />
            <Route path="/createplaylist" element={<div> {topSpace} <CreatePlaylist /></div>} />
            <Route path="/searchresultpage" element={<div> {topSpace} <SearchResultPage /></div>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

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

import './App.css';
import SearchResultPage from './pages/SearchResultPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<LogInForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/createcourse" element={<CreateCourse />} />
            <Route path="/searchresultpage" element={<SearchResultPage />} />
            
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

  import React from 'react';
  import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
  import { UserProvider } from './UserContext';

  import Header from './pages/Header';
  import LogInForm from './pages/LogInForm';
  import VideoPage from './pages/VideoPage';
  import HomePage from './pages/HomePage';
  import UserPage from './pages/UserPage';
  import CreateCourse from './pages/CreateCourse';
  import Test from './pages/Test'

  import './App.css';

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
              <Route path="/test" element={<Test />} />
              <Route path="/createcourse" element={<CreateCourse />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    );
  }

  export default App;

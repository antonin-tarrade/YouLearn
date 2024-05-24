import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo_color.png';
import './Header.css';
import { ReactComponent as SearchIcon } from '../img/search.svg';
import { ReactComponent as UserSignedOutIcon } from '../img/user-signed-out.svg';

function Header() {

  const { userLoged, setUserLoged, setUser } = useUser();
  const navigate = useNavigate();

  const [isSearchShown, setIsSearchShown] = useState(false);
  const searchFieldRef = useRef(null);
  const searchButtonRef = useRef(null);

  const handleSearchButtonClick = () => {
    setIsSearchShown(true);
  };

  const handleDocumentMouseDown = (event) => {
    if (searchFieldRef.current && !searchFieldRef.current.contains(event.target) && !searchButtonRef.current.contains(event.target)) {
      setIsSearchShown(false);
    }
  };

  useEffect(() => {
    if (isSearchShown && searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  }, [isSearchShown]);

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
    };
  }, []);

  const handleLogout = () => {
    setUserLoged(null);
    navigate('/login');
  };

  const handleGoToUserLogedPage = () => {
    setUser(userLoged);
    navigate('/user');
  };


  if (userLoged === null) {
    return null;
  }

  return (
    <header className="header">

      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <div className="search-wrapper" tabIndex="-1">
        <button className="search-button" onClick={handleSearchButtonClick} style={{ opacity: isSearchShown ? 0 : 1 }} ref={searchButtonRef}>
          <SearchIcon className="search-icon" />
        </button>
        <input
          type="text"
          className={`search-field ${isSearchShown ? 'visible' : ''}`}
          ref={searchFieldRef}
          style={{ width: isSearchShown ? '60%' : '0', opacity: isSearchShown ? 1 : 0 }}
          onBlur={() => setIsSearchShown(false)}
        />
      </div>

      <button onClick={handleGoToUserLogedPage} className='App-link'>
        <p>{userLoged.username}</p>
      </button>

      <button onClick={handleLogout} className="logout-button">
        <UserSignedOutIcon className="user-icon" />
      </button>

    </header>
  );
}

export default Header;

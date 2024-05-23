import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo_color.png';
import './Header.css';
import { ReactComponent as SearchIcon } from '../img/search.svg';
import { ReactComponent as UserSignedInIcon } from '../img/user-signed-in.svg';

function Header() {

  const { user, setIsSignedIn } = useUser();

  const [isSearchShown, setIsSearchShown] = useState(false);
  const searchFieldRef = useRef(null);
  const searchButtonRef = useRef(null);
  const navigate = useNavigate();

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
    setIsSignedIn(false);
    navigate('/login');
  };

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

      <Link to="/user" className='App-link'>
        <p>{user.username}</p>
      </Link>

      <button onClick={handleLogout} className="logout-button">
        <UserSignedInIcon className="user-icon" />
      </button>

    </header>
  );
}

export default Header;

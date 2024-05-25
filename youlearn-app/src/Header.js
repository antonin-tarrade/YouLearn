import React, { useState, useRef, useEffect } from 'react';
import logo from './img/logo_color.png';
import './Header.css';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { ReactComponent as UserSignedInIcon} from './img/user-signed-in.svg';

function Header({ userId }) {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const searchFieldRef = useRef(null);
  const searchButtonRef = useRef(null);

  const handleSearchButtonClick = () => {
    setIsSearchShown(true);
  };

  const handleUserIconClick = () => {
    // if (isUserSignedIn) {
    //   window.location.href = "/user-account"; 
    // }
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
  return (
    <header className="header">
      <a href='/'>
        <img src={logo} alt="logo" className="logo" />
      </a>
      <div className="search-wrapper" tabIndex="-1">
        <button className="search-button" onClick={handleSearchButtonClick} style={{opacity: isSearchShown ? 0 : 1}} ref={searchButtonRef}>
          <SearchIcon className="search-icon"/>
        </button>
        <input
          type="text"
          className={`search-field ${isSearchShown ? 'visible' : ''}`}
          ref={searchFieldRef}
          style={{width: isSearchShown ? '60%' : '0', opacity: isSearchShown ? 1 : 0}}
          onBlur={() => setIsSearchShown(false)}
        />
      </div>
      { userId ? <p>{userId}</p> : null }
      <button className="signin-button" onClick={handleUserIconClick}>
        <UserSignedInIcon className="user-icon"/> 
      </button>
    </header>
  );
}

export default Header;

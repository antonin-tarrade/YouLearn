import React, { useState } from 'react';
import logo from './img/logo_color.png';
import './Header.css';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { ReactComponent as UserSignedInIcon} from './img/user-signed-in.svg'
import { ReactComponent as UserSignedOutIcon} from './img/user-signed-out.svg'

function Header({ isUserSignedIn, userEmail }) {

  const handleUserIconClick = () => {
    // if (isUserSignedIn) {
    //   window.location.href = "/user-account"; 
    // }
  };

  return (
    <header className="header">
        <a href='/'>
            <img src={logo} alt="logo" className="logo" />
        </a>
        <button className="search-button">
            <SearchIcon className="search-icon"/>
        </button>
        <button className="signin-button" onClick={isUserSignedIn ? handleUserIconClick : null}>
          {isUserSignedIn ? <UserSignedInIcon className="user-icon"/> : <UserSignedOutIcon className="user-icon"/>}
        </button>
    </header>
  );
}

export default Header;
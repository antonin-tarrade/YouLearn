import React, { useState } from 'react';
import logo from './img/logo_color.png';
import './Header.css';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { ReactComponent as UserSignedInIcon} from './img/user-signed-in.svg'
import { ReactComponent as UserSignedOutIcon} from './img/user-signed-out.svg'
import SignInForm from './SignInForm';

function Header() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);

  const handleUserIconClick = () => {
    if (!isUserSignedIn) {
      setShowSignInForm(true);
    }
  };

  const handleFormSubmit = () => {
    setIsUserSignedIn(true);
    setShowSignInForm(false);
  };

  return (
    <header className="header">
        <a href='/'>
            <img src={logo} alt="logo" className="logo" />
        </a>
        <button className="search-button">
            <SearchIcon className="search-icon"/>
        </button>
        <button className="signin-button" onClick={handleUserIconClick}>
            {isUserSignedIn ? <UserSignedInIcon className="user-icon"/> : <UserSignedOutIcon className="user-icon"/>}
        </button>
        {showSignInForm && <SignInForm onSubmit={handleFormSubmit} />}
    </header>
  );
}

export default Header;
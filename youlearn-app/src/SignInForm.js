import React, { useState } from 'react';
import './SignInForm.css';
import logo from './img/logo_color.png';

function SignInForm({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignIn(email,password)
  };

  return (
    <div className="form">
      <img src={logo} alt="logo" className="form-logo"></img>
        <form onSubmit={handleSubmit} className="form-content">
          <label className='form-field'>
            <p className='form-text'>Email:</p>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className='form-field'>
            <p className='form-text'>Mot de passe:</p>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          {email && password && <input className="global-button" type="submit" value="Se connecter" />}
          <a href='/' className='mdp'>mot de passe oublié ?</a>
        </form>
    </div>
  );
}

export default SignInForm;
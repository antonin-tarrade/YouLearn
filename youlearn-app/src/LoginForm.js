import React, { useState } from 'react';
import './LogInForm.css';
import logo from './img/logo_color.png';

import {invokePost,invokeGet} from './api'

function LogInForm({onLogIn}) {
  const [option, setOption] = useState('');
  const [department, setDepartment] = useState('SN');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    let student = {}
    let user ={}
    user.username = id;
    user.email = email;
    user.password = password;
    student.user = user;
    student.department = department;
    invokePost("signUpStudent",student,"SUCCESS","FAILURE");
    onLogIn(id,password)
  };


  const handleCreateAccount = (event) => {
    setHasAccount(!hasAccount);
    setEmail('');
    setId('');
    setOption('');
    setPassword('');
  }

  return (
    <div className="form">
      <img src={logo} alt="logo" className="form-logo"></img>
        <form onSubmit={handleSubmit} className="form-content">
          <div className={`form-field ${hasAccount ? '' : 'visible'}`}>
            <label className='form-option'>
              <p className='form-text'>Professeur:</p>
              <input className="form-radio" type="radio" name="option" value="option1" onChange={e => setOption(e.target.value)} />
            </label>
            <label className='form-option'>
              <p className='form-text'>Etudiant:</p>
              <input className="form-radio" type="radio" name="option" value="option2" onChange={e => setOption(e.target.value)} />
            </label>
          </div>
          <label className='form-field visible'>
            <p className='form-text'>Identifiant:</p>
            <input className="form-input" type="text" value={id} onChange={e => setId(e.target.value)} required />
          </label>
          <label className={`form-field ${hasAccount ? '' : 'visible'}`}>
            <p className='form-text'>Adresse Email:</p>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className='form-field visible'>
            <p className='form-text'>Mot de passe:</p>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <input className={`global-button ${id && password? 'visible' : ''}` } type="submit" value={`${hasAccount ? 'Se connecter' : 'S\'enregistrer'}`} />
          <div className={`links ${hasAccount ? 'visible' : ''}`}>
            <button className='link' onClick={handleCreateAccount}>Créer un compte</button>
            <button className='link'>Mot de passe oublié ?</button>
          </div>
          <div className={`links ${hasAccount ? '' : 'visible'}`}>
            <button className='link' onClick={handleCreateAccount}>J'ai deja un compte</button>
          </div>
        </form>
    </div>
  );
}

export default LogInForm;
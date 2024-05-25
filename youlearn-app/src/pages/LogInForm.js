import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

import './LogInForm.css';
import logo from '../img/logo_color.png';
import { userExample } from '../data';

import { invokePost, invokePostAndAwaitResponse, invokeGet } from '../api';

function LogInForm() {

  const { userLoged, setUserLoged } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    if (userLoged !== null) {
      navigate('/');
    }
  }, [userLoged, navigate]);

  if (userLoged !== null) {
    return null;
  }


  const handleSignIn = (event) => {
    event.preventDefault();
    let newUser = {}
    newUser.username = id;
    newUser.email = email;
    newUser.password = password;
    newUser.role = role;
    if (role === 0) {
      let student = {}
      student.user = newUser;
      student.department = department;
      invokePostAndAwaitResponse("signUpStudent", student)
        .then(data => console.log(data.json()));
    } else if (role === 1) {
      let teacher = {}
      teacher.user = newUser;
      teacher.name = name;
      invokePostAndAwaitResponse("signUpTeacher", teacher)
        .then(data => console.log(data.json()));
    } else {
      console.log("Role Error");
    }
    setUserLoged(userExample);
    navigate('/');
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    let signUser = {}
    signUser.username = id;
    signUser.password = password;
    invokePostAndAwaitResponse("loginUser", signUser).then(data => data.json()).then(json => console.log(json));

    setUserLoged(userExample);
    console.log("userLoged après setUserLoged:", userLoged);
    navigate('/');
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    setHasAccount(!hasAccount);
    setEmail('');
    setId('');
    setRole(null);
    setPassword('');
    setDepartment('');
    setName('');
  }

  const handleRoleChange = (event) => {
    setRole(Number(event.target.value));
    setDepartment('');
    setName('');
  }

  return (
    <div className="form">
      <img src={logo} alt="logo" className="form-logo"></img>
      <form onSubmit={hasAccount ? handleLogIn : handleSignIn} className="form-content">
        <div className={`form-field ${hasAccount ? '' : 'visible'}`}>
          <label className='form-option'>
            <p className='form-text'>Professeur:</p>
            <input className="form-radio" type="radio" name="role" value={1} onChange={handleRoleChange} required={!hasAccount} />
          </label>
          <label className='form-option'>
            <p className='form-text'>Etudiant:</p>
            <input className="form-radio" type="radio" name="role" value={0} onChange={handleRoleChange} required={!hasAccount} />
          </label>
        </div>

        <label className={`form-field ${!hasAccount && role === 0 ? 'visible' : ''}`}>
          <p className='form-text'>Department:</p>
          <input className="form-input" type="text" value={department} onChange={e => setDepartment(e.target.value)} required={!hasAccount && role === 0} />
        </label>

        <label className={`form-field ${!hasAccount && role === 1 ? 'visible' : ''}`}>
          <p className='form-text'>Nom:</p>
          <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} required={!hasAccount && role === 1} />
        </label>

        <label className='form-field visible'>
          <p className='form-text'>Identifiant:</p>
          <input className="form-input" type="text" value={id} onChange={e => setId(e.target.value)} required />
        </label>
        <label className={`form-field ${hasAccount ? '' : 'visible'}`}>
          <p className='form-text'>Adresse Email:</p>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required={!hasAccount} />
        </label>
        <label className='form-field visible'>
          <p className='form-text'>Mot de passe:</p>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <input className={`global-button ${id && password ? 'visible' : ''}`} type="submit" value={`${hasAccount ? 'Se connecter' : 'S\'enregistrer'}`} name="button" />
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

import React, { useState } from 'react';
import './LogInForm.css';
import logo from './img/logo_color.png';

import {invokePost,invokePostAndAwaitResponse,invokeGet} from './api'

function LogInForm({onLogIn}) {
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    let user ={}
      user.username = id;
      user.email = email;
      user.password = password;
      user.role = role;
    if(role == 0) { 
      let student = {}
      student.user = user;
      student.department = department;
      invokePostAndAwaitResponse("signUpStudent",student)
        .then(data => console.log(data.json()));
    } else if (role == 1){
      let teacher = {}
      teacher.user = user;
      teacher.name = name;
      invokePostAndAwaitResponse("signUpTeacher",teacher)
      .then(data => console.log(data.json()));
    } else {
      console.log("Role Error");
    }
    
    onLogIn(id,password)
  };


  const handleCreateAccount = (event) => {
    setHasAccount(!hasAccount);
    setEmail('');
    setId('');
    setRole('');
    setPassword('');
  }

  return (
    <div className="form">
      <img src={logo} alt="logo" className="form-logo"></img>
        <form onSubmit={handleSubmit} className="form-content">
          <div className={`form-field ${hasAccount ? '' : 'visible'}`}>
            <label className='form-option'>
              <p className='form-text'>Professeur:</p>
              <input className="form-radio" type="radio" name="role" value={1} onChange={e => setRole(e.target.value)} required/>
            </label>
            <label className='form-option'>
              <p className='form-text'>Etudiant:</p>
              <input className="form-radio" type="radio" name="role" value={0} onChange={e => setRole(e.target.value)} required/>
            </label>
          </div>

          <label className={`form-field ${role == 0 ? 'visible' : '' }`}>
            <p className='form-text'>Department:</p>
            <input className="form-input" type="text" value={department} onChange={e => setDepartment(e.target.value)} required={role == 0} />
          </label>

          <label className={`form-field ${role == 1 ? 'visible' : '' }`}>
            <p className='form-text'>Nom:</p>
            <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} required={role == 1} />
          </label>

          <label className='form-field visible'>
            <p className='form-text'>Identifiant:</p>
            <input className="form-input" type="text" value={id} onChange={e => setId(e.target.value)} required />
          </label>
          <label className={`form-field ${hasAccount ? '' : 'visible'}`}>
            <p className='form-text'>Adresse Email:</p>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required={hasAccount} />
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
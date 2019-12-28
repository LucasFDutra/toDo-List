import React from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';

const Login = () => (
  <div className='container'>
    <img src={logo} alt='MulyToDoList' className='logo' />
    <input type='email' className='username' placeholder='Digite seu email' />
    <input type='password' className='password' placeholder='Digite sua senha' />
    <button className='ok'>Ok</button>
  </div>
);

export default Login;

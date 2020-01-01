import React from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background image.jpg';


const Main = () => (
  <>
    <img src={Background} alt='Muly ToDo List' className='background' />
    <div className='userArea'>
      <img src={Logo} alt='Muly ToDo List' className='logoUserArea' />
      <input type='email' className='username' placeholder='Digite seu email' />
      <input type='password' className='password' placeholder='Digite sua senha' />
      <div className='buttons'>
        <button className='login'>Login</button>
        <button className='signIn'>Sign In</button>
      </div>
    </div>
  </>
);

export default Main;

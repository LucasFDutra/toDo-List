import React from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background image.jpg';

const Main = () => {
  return (
    <>
    <div className='headerMain'>
      <img src={Logo} alt='Muly ToDo List' className='logo' />
      <div className="actions">
        <label htmlFor="add a account">Add an account</label>
        <label htmlFor="Login">Login</label>
      </div>
    </div>
    <img src={Background} alt="mulyToDoList" className="background"/>
    </>
  )
}

export default Main

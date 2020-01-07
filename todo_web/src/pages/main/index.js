import React, { useState } from 'react';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background image.jpg';
import './styles.css';

// variables init with main_

const Main = ({ history }) => {
  const [main_username, setMain_Username] = useState('');
  const [main_password, setMain_Password] = useState('');

  const main_loginUser = async () => {
    const response = await api.get('/user/loginUser', {
      headers: {
        username: main_username,
        password: main_password,
      },
    });
    if (response.data === 200) {
      history.push({
        pathname: `./${main_username}`,
        state: {
          username: main_username,
          password: main_password,
        },
      });
    } else if (response.data === 400) {
      window.alert('User not found!');
    } else if (response.data === 401) {
      window.alert('Incorrect password!');
    } else if (response.data === 403) {
      window.alert('insufficient data');
    }
  };

  const main_signInUser = async () => {
    const response = await api.post('/user/createNewUser', {
      username: main_username,
      password: main_password,
    });

    if (response.data === 200) {
      history.push({
        pathname: `./${main_username}`,
        state: {
          username: main_username,
          password: main_password,
        },
      });
    } else if (response.data === 402) {
      window.alert('Existing user!');
    } else if (response.data === 403) {
      window.alert('insufficient data');
    }
  };

  const main_logout = () => {
    setMain_Username('');
    setMain_Password('');
  };

  return (
    <>
      <img src={Background} alt='Muly ToDo List' className='main_background' />
      <div className='main_container'>
        <img src={Logo} alt='Muly ToDo List' className='main_logo' />
        <input type='text' className='main_username' placeholder='Digite seu email' onChange={(event) => setMain_Username(event.target.value)} value={main_username} />
        <input type='password' className='main_password' placeholder='Digite sua senha' onChange={(event) => setMain_Password(event.target.value)} value={main_password} />
        <div className='main_buttons'>
          <button className='main_login' onClick={() => main_loginUser()}>Login</button>
          <button className='main_signIn' onClick={() => main_signInUser()}>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Main;

import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background image.jpg';
import api from '../../services/api';

const Main = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const response = await api.get('/user/loginUser', {
      headers: {
        username,
        password,
      },
    });
    if (response.data === 200) {
      history.push({
        pathname: `./${username}`,
        state: {
          username,
          password,
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

  const signInUser = async () => {
    const response = await api.post('/user/createNewUser', {
      username,
      password,
    });

    if (response.data === 200) {
      history.push({
        pathname: `./${username}`,
        state: {
          username,
          password,
        },
      });
    } else if (response.data === 402) {
      window.alert('Existing user!');
    } else if (response.data === 403) {
      window.alert('insufficient data');
    }
  };

  return (
    <>
      <img src={Background} alt='Muly ToDo List' className='background' />
      <div className='userArea'>
        <img src={Logo} alt='Muly ToDo List' className='logoUserArea' />
        <input type='text' className='username' placeholder='Digite seu email' onChange={(event) => setUsername(event.target.value)} />
        <input type='password' className='password' placeholder='Digite sua senha' onChange={(event) => setPassword(event.target.value)} />
        <div className='buttons'>
          <button className='login' onClick={loginUser}>Login</button>
          <button className='signIn' onClick={signInUser}>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Main;

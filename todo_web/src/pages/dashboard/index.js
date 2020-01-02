import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import Menu from '../../components/menu/index';
import './styles.css';
import Logo from '../../assets/logo.svg';
import menuIcon from '../../assets/menu.svg';

const Dashboard = ({ match, history }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const { username } = match.params;
    const password = localStorage.getItem('password');

    loadCards(username, password);
  }, []);

  const loadCards = async (username, password) => {
    const response = await api.get(`/user/${username}`, {
      headers: {
        password,
      },
    });
    setCards(response.data.cards);
  };

  const addNewCard = () => {
    console.log('add a new card');
  };

  return (
    <>
      <div className='header'>
        <button className='menuIcon'>
          <img src={menuIcon} alt='menuIcon' />
        </button>
        <img src={Logo} alt='Muly ToDo List' className='logo' />
        <button className='refrash' onClick={() => {}}>Refresh</button>
        <button className='logout' onClick={loadCards(match.params.username, localStorage.getItem('password'))}>Logout</button>
      </div>
      <div className='menu'>
        <Menu />
      </div>
      <div className='newCard'>
        <input type='text' placeholder='Card Title' />
        <input
          type='button'
          placeholder='Card label'
          onClick={
            <Card />
        }
        />
      </div>
      <div className='board'>
        {
          cards.map((card) => (
            <Card key={card._id} data={card} />
          ))
        }
      </div>
    </>

  );
};

export default Dashboard;

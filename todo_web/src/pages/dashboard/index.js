import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import './styles.css';
import Logo from '../../assets/logo.svg';

const Dashboard = ({ match }) => {
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
        <img src={Logo} alt='Muly ToDo List' className='logo' />
        <button className='moreOneCard' onClick={addNewCard}>Add a new card</button>
      </div>
      <div className='board'>
        {
          cards.map((card) => (
            <Card key={card._id} />
          ))
        }
      </div>
    </>

  );
};

export default Dashboard;

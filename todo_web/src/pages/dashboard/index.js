import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import Menu from '../../components/menu/index';
import NewCard from '../../components/newCard/index'
import './styles.css';
import menuIcon from '../../assets/menu.svg';
import Logo from '../../assets/logo.svg';

const Dashboard = ({ match, history }) => {
  const [cards, setCards] = useState([]);
  const [menuState, setMenuState] = useState(false);

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

  return (
    <>
      <div className='header'>
        <button className='menuIcon' onClick={() => setMenuState(!menuState)}>
          <img src={menuIcon} alt='menuIcon' />
        </button>
        <img src={Logo} alt='Muly ToDo List' className='logo' />
        <button className='refrash'>Refresh</button>
        <button className='logout'>Logout</button>
      </div>
      <NewCard />
      <div className='dashboard'>
        {
          menuState && (
            <Menu data={cards} />
            )
        }
        <div className='board'>
          {
            cards.map((card) => (
              <Card key={card._id} data={card} />
              ))
            }
        </div>
      </div>
    </>
  );
};

export default Dashboard;

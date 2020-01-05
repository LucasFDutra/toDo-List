import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import Menu from '../../components/menu/index';
import menuIcon from '../../assets/menu.svg';
import Logo from '../../assets/logo.svg';
import './styles.css';

const Dashboard = ({ match, history }) => {
  const [cards, setCards] = useState([]);
  const [menuState, setMenuState] = useState(false);
  const [addNewCard, setAddNewCard] = useState(false);

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

  const pressLogout = () => {
    if (window.confirm('Do you really want to leave?')){
      localStorage.removeItem('password');
      history.push('./')
    }
  }

  return (
    <>
      <div className='header'>
        <button className='menuIcon' onClick={() => setMenuState(!menuState)}>
          <img src={menuIcon} alt='menuIcon' />
        </button>
        <img src={Logo} alt='Muly ToDo List' className='logo' />
        <button className='refrash' onClick={() => {loadCards(match.params.username, localStorage.getItem('password'))}}>Refresh</button>
        <button className='logout' onClick={pressLogout}>Logout</button>
      </div>
      <div className='newCard'>
        <label type='button' className='newCardAdd' htmlFor="newCardAdd" onClick={() => setAddNewCard(!addNewCard)}>Add A Card</label>
      </div>
      {
        addNewCard && (
          <div className="addNewCard" onKeyPress={() => setAddNewCard(!addNewCard)}>
            <Card data={{"title":"Card Title", "task":[''], "label":'none'}}/>
          </div>
        )
      }

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

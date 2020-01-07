import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import NewCard from '../../components/newCard/index';
import menuIcon from '../../assets/menu.svg';
import Logo from '../../assets/logo.svg';
import LabelIcon from '../../assets/labelIcon.svg';
import './styles.css';

const Dashboard = ({ history }) => {
  const [username, setUsername] = useState(history.location.state.username);
  const [password, setPassword] = useState(history.location.state.password);
  const [cards, setCards] = useState([]);
  const [label, setLabel] = useState('');
  const [menuState, setMenuState] = useState(false);
  const [addNewCard, setAddNewCard] = useState(false);

  useEffect(() => {
    loadCards();
  }, [label]);

  const Label = (cardLabel) => (
    <div>
      <img src={LabelIcon} alt='labelIcon' className='labelIcon' />
      <label htmlFor='label' className='labelClass'>{cardLabel.data}</label>
    </div>
  );

  const Menu = () => {
    let arrayLabels = [];
    cards.map((card) => (
      card.label !== '' ? arrayLabels = [...arrayLabels, card.label] : false
    ));
    arrayLabels = [...new Set(arrayLabels)];

    return (
      <div className='menu'>
        <div className='labelAllCards' onClick={() => { setLabel(''); }}>
          <label htmlFor='label'>Labels</label>
        </div>
        {
          arrayLabels.map((cardLabel, index) => (
            <div key={index} className='labels' onClick={() => { setLabel(cardLabel); }}>
              <Label data={cardLabel} />
            </div>
          ))
        }
      </div>
    );
  };

  const loadCards = async () => {
    const response = await api.get(`/card/loadAllCards/${username}`, {
      headers: {
        password,
        label,
      },
    });
    if (response.data === 404) {
      window.alert('access denied');
    } else {
      setCards(response.data);
    }
  };

  const pressLogout = () => {
    if (window.confirm('Do you really want to leave?')) {
      history.push('./');
    }
  };

  return (
    <>
      <div className='header'>
        <button className='menuIcon' onClick={() => setMenuState(!menuState)}>
          <img src={menuIcon} alt='menuIcon' />
        </button>
        <img src={Logo} alt='Muly ToDo List' className='logo' />
        <button className='refrash' onClick={() => { loadCards(); }}>Refresh</button>
        <button className='logout' onClick={() => { pressLogout(); }}>Logout</button>
      </div>
      <div className='newCard'>
        <label type='button' className='newCardAdd' htmlFor='newCardAdd' onClick={() => setAddNewCard(!addNewCard)}>Add A Card</label>
      </div>
      {
        addNewCard && (
          <NewCard data={{ username, password, setAddNewCard, loadCards }} />
        )
      }

      <div className='dashboard'>
        {
          menuState && (
            <Menu />
          )
        }
        <div className='board'>
          {
            cards.map((card) => (
              <Card key={card._id} data={{card, username, password}} />
            ))
            }
        </div>
      </div>
    </>
  );
};

export default Dashboard;

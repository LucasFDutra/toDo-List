import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import NewCard from '../../components/newCard/index';
import menuIcon from '../../assets/menu.svg';
import Logo from '../../assets/logo.svg';
import LabelIcon from '../../assets/labelIcon.svg';
import RefreshIcon from '../../assets/refreshIcon.svg';
import LogoutIcon from '../../assets/logoutIcon.svg';
import './styles.css';

// variables init with dashboard_

const Dashboard = ({ history }) => {
  const [dashboard_username, setDashboard_Username] = useState(history.location.state.username);
  const [dashboard_password, setPassword] = useState(history.location.state.password);
  const [dashboard_addNewCardState, setDashboard_AddNewCardState] = useState(false);
  const [dashboard_menuState, setDashboard_MenuState] = useState(false);
  const [dashboard_selectedLabel, setDashboard_SelectedLabel] = useState('');
  const [dashboard_cards, setDashboard_Cards] = useState([]);

  useEffect(() => {
    dashboard_loadCards();
  }, [dashboard_selectedLabel]);

  const dashboard_loadCards = async () => {
    const response = await api.get(`/card/loadAllCards/${dashboard_username}`, {
      headers: {
        password: dashboard_password,
        label: dashboard_selectedLabel,
      },
    });
    if (response.data === 404) {
      window.alert('access denied');
    } else {
      setDashboard_Cards(response.data);
    }
  };

  const DashboardLogout = () => {
    if (window.confirm('Do you really want to leave?')) {
      history.go(-history.length);
      window.location.replace('./');
    }
  };

  const Label = (label) => (
    <div>
      <img src={LabelIcon} alt='labelIcon' className='dashboard_labelIcon' />
      <label htmlFor='label'>{label.data}</label>
    </div>
  );

  const Menu = () => {
    let arrayLabels = [];
    dashboard_cards.map((card) => (
      card.label !== '' ? arrayLabels = [...arrayLabels, card.label] : false
    ));
    arrayLabels = [...new Set(arrayLabels)];

    return (
      <div className='dashboard_menu'>
        <div className='dashboard_mainLabel' onClick={() => { setDashboard_SelectedLabel(''); }}>
          <label htmlFor='label'>Labels</label>
        </div>
        {
          arrayLabels.map((label, index) => (
            <div key={index} className='dashboard_labels' onClick={() => { setDashboard_SelectedLabel(label); }}>
              <Label data={label} />
            </div>
          ))
        }
      </div>
    );
  };

  return (
    <>
      <div className='dashboard_header'>
        <button className='dashboard_menuIcon' onClick={() => setDashboard_MenuState(!dashboard_menuState)}>
          <img src={menuIcon} alt='menuIcon' />
        </button>
        <img src={Logo} alt='Muly ToDo List' className='dashboard_logo' />
        <button className='dashboard_refresh' onClick={() => { dashboard_loadCards(); }}>
          <img src={RefreshIcon} alt='refreshIcon' className='deshboard_refreshIcon' />
        </button>
        <button className='dashboard_logout' onClick={() => { DashboardLogout(); }}>
          <img src={LogoutIcon} alt='logoutIcon' className='dashboard_logoutIcon' />
        </button>
      </div>
      <div className='dashboard_addNewCard'>
        <label type='button' htmlFor='addNewCard' onClick={() => setDashboard_AddNewCardState(!dashboard_addNewCardState)}>Add A Card</label>
      </div>
      {
        dashboard_addNewCardState && (
          <NewCard data={
            {
              username: dashboard_username,
              password: dashboard_password,
              setDashboard_AddNewCardState,
              dashboard_loadCards,
            }
          }
          />
        )
      }

      <div className='dashboard_menuContainer'>
        {
          dashboard_menuState && (
            <Menu />
          )
        }
        <div className='dashboard_cardsContainer'>
          {
            dashboard_cards.map((card) => (
              <Card
                key={card._id}
                data={
                {
                  card,
                  username: dashboard_username,
                  password: dashboard_password,
                  dashboard_loadCards,
                }
              }
              />
            ))
            }
        </div>
      </div>
    </>
  );
};

export default Dashboard;

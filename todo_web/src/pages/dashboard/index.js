import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/cards/index';
import NewCard from '../../components/newCard/index';
import Menu from '../../components/menu/index';
import HiddenIcon from '../../assets/hiddenIcon.svg';
import ShowIcon from '../../assets/showIcon.svg';
import './styles.css';
import DashboardHeader from '../../components/dashboardHeader/index';

// variables init with dashboard_

const Dashboard = ({ history }) => {
  const [dashboard_username, setDashboard_Username] = useState(history.location.state.username);
  const [dashboard_password, setPassword] = useState(history.location.state.password);
  const [dashboard_addNewCardState, setDashboard_AddNewCardState] = useState(false);
  const [dashboard_menuState, setDashboard_MenuState] = useState(false);
  const [dashboard_selectedLabel, setDashboard_SelectedLabel] = useState('');
  const [dashboard_labels, setDashboard_Labels] = useState([]);
  const [dashboard_cardsPinned, setDashboard_CardsPinned] = useState([]);
  const [dashboard_cardsUnpinned, setDashboard_CardsUnpinned] = useState([]);
  const [dashboard_hiddePinned, setDashboard_HiddePinned] = useState(false);
  const [dashboard_hiddeUnpinned, setDashboard_HiddeUnpinned] = useState(false);

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
      let arrayLabels = [];
      let arrayCardsPinned = [];
      let arrayCardsUnpinned = [];
      response.data.map((card) => {
        arrayLabels = [...arrayLabels, card.label];
        if (card.pinned) {
          arrayCardsPinned = [...arrayCardsPinned, card];
        } else {
          arrayCardsUnpinned = [...arrayCardsUnpinned, card];
        }
      });
      setDashboard_CardsPinned(arrayCardsPinned);
      setDashboard_CardsUnpinned(arrayCardsUnpinned);
      setDashboard_Labels(arrayLabels);
    }
  };

  const menuControl = () => {
    setDashboard_MenuState(!dashboard_menuState);
  };

  const logout = () => {
    if (window.confirm('Do you really want to leave?')) {
      history.go(-history.length);
      window.location.replace('./');
    }
  };

  const refresh = () => {
    dashboard_loadCards();
  };

  return (
    <>
      <DashboardHeader menuControl={menuControl} logout={logout} refresh={refresh} />

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

      <div className='dashboard_dashboardContainer'>

        <div className='dashboard_menuContainer'>
          {
            dashboard_menuState && (
              <Menu />
            )
          }
        </div>
        <div className='dashboard_cardsContainer'>
          <div className='dashboard_cardsPinnedLabelContainer'>
            <label className='dashboard_cardsPinnedLabel' htmlFor='pinned'>Pinned</label>
            <button className='dashboard_cardsPinnedLabelButton' onClick={() => setDashboard_HiddePinned(!dashboard_hiddePinned)}>
              <img src={(dashboard_hiddePinned ? ShowIcon : HiddenIcon)} alt='hidden pinned icon' className='dashboard_cardPinnedLabelIcon' />
            </button>
          </div>
          {
            !dashboard_hiddePinned && (
              <div className='dashboard_cardsPinned'>
                {
                dashboard_cardsPinned.map((card) => (
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
            )
          }
          <div className='dashboard_cardsUnpinnedLabelContainer'>
            <label className='dashboard_cardsUnpinnedLabel' htmlFor='unpinned'>Others</label>
            <button className='dashboard_cardsUnpinnedLabelButton' onClick={() => setDashboard_HiddeUnpinned(!dashboard_hiddeUnpinned)}>
              <img src={(dashboard_hiddeUnpinned ? ShowIcon : HiddenIcon)} alt='hidden pinned icon' className='dashboard_cardUnpinnedLabelIcon' />
            </button>
          </div>
          {
            !dashboard_hiddeUnpinned && (
            <div className='dashboard_cards_Unpinned'>
              {
                dashboard_cardsUnpinned.map((card) => (
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
            )
          }
        </div>
      </div>

    </>
  );
};

export default Dashboard;

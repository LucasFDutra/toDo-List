import React from 'react';
import Card from '../../components/cards/index';
import './styles.css';
import Logo from '../../assets/logo.svg';

const Dashboard = () => (
  <>
    <div className='header'>
      <img src={Logo} alt='Muly ToDo List' className='logo' />
      <button className='moreOneCard'>Add a new card</button>
    </div>
    <div className='board'>
      <Card />
      <Card />
      <Card />
    </div>
  </>
);

export default Dashboard;

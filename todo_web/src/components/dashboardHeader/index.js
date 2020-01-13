import React from 'react';
import menuIcon from '../../assets/menu.svg';
import Logo from '../../assets/logo.svg';
import RefreshIcon from '../../assets/refreshIcon.svg';
import LogoutIcon from '../../assets/logoutIcon.svg';

import './styles.css';

const DashboardHeader = ({ menuControl, logout, refresh }) => (
  <div className='dashboard_header'>
    <div className='dashboard_headerLeftContainer'>
      <button className='dashboard_menuIcon' onClick={() => menuControl()}>
        <img src={menuIcon} alt='menuIcon' />
      </button>
      <img src={Logo} alt='Muly ToDo List' className='dashboard_logo' />
    </div>
    <div className='dashboard_headerRightContainer'>
      <button className='dashboard_refresh' onClick={() => refresh()}>
        <img src={RefreshIcon} alt='refreshIcon' className='deshboard_refreshIcon' />
      </button>
      <button className='dashboard_logout' onClick={() => logout()}>
        <img src={LogoutIcon} alt='logoutIcon' className='dashboard_logoutIcon' />
      </button>
    </div>
  </div>
);
export default DashboardHeader;

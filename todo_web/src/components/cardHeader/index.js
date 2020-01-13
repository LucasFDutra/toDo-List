import React, { useState, useEffect } from 'react';
import PinnedIcon from '../../assets/pinnedIcon.svg';
import './styles.css';

const CardHeader = () => (
  <div className='card_headerContainer'>
    <input className='card_title' />
    <button className='card_pinnedCard'>
      <img src={PinnedIcon} alt='pinned icon' className='card_pinnedCardIcon' />
    </button>
  </div>
);

export default CardHeader;

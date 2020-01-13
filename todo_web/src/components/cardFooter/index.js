import React, { useState, useEffect } from 'react';
import MenuCardIcon from '../../assets/menuCardIcon.svg';

import './styles.css';

const CardFooter = () => (
  <div className='card_footer'>
    <div>
      <div className='card_labelContainer'>
        <input type='text' className='card_label' />
      </div>
    </div>
    <div className='card_footerButtons'>
      <button className='card_labelButton'>Add Label</button>
      <button className='card_deleteCardButton'>Delete Card</button>
      <button className='card_updateCardButton'>Update</button>
      <button className='card_menuCard'>
        <img src={MenuCardIcon} alt='menu card icon' className='card_menuCardIcon' />
      </button>
    </div>
  </div>
);

export default CardFooter;

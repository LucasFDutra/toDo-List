import React, { useState, useEffect } from 'react';
import LabelIcon from '../../assets/labelIcon.svg';
import './styles.css';

const Label = ({ label }) => (
  <div>
    <img src={LabelIcon} alt='labelIcon' className='dashboard_labelIcon' />
    <label htmlFor='label'>{label}</label>
  </div>
);

const Menu = ({ labels, selectLabel }) => (
  <div className='dashboard_menu'>
    <div className='dashboard_mainLabel'>
      <label htmlFor='label'>Labels</label>
    </div>
    <div className='dashboard_labels'>
      <Label label='label 1' />
    </div>
  </div>
);

export default Menu;

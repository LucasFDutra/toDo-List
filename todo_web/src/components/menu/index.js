import React from 'react';
import LabelIcon from '../../assets/labelIcon.svg';
import './styles.css';

const Menu = () => (
  <div className='menu'>
    <label htmlFor='label'>label</label>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
    <div className='labels'>
      <img src={LabelIcon} alt='labelIcon' />
      <label htmlFor='label'>label name</label>
    </div>
  </div>
);

export default Menu;

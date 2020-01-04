import React from 'react';
import LabelIcon from '../../assets/labelIcon.svg';
import './styles.css'

const Label = (cardLabel) => (
  <div className='labels'>
    <img src={LabelIcon} alt='labelIcon' className='labelIcon' />
    <label htmlFor='label' className='labelClass'>{cardLabel.data}</label>
  </div>
)

export default Label;

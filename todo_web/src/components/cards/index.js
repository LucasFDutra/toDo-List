import React from 'react';
import Task from '../tasks/index';
import './styles.css';

const Card = () => (
  <div className='card'>
    <h1 className='title'>Titulo do card</h1>
    <Task />
    <Task />
    <Task />
    <Task />
    <Task />

  </div>
);

export default Card;

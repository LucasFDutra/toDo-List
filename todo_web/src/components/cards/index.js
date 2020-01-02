import React, { useEffect } from 'react';
import Task from '../tasks/index';
import './styles.css';

const Card = (card) => {
  useEffect(() => {
    console.log(card);
  }, []);

  return (
    <div className='card'>
      <h1 className='title'>{card.data.title}</h1>
      {
        card.data.task.map((task) => (
          <Task />
        ))
      }
      <label htmlFor='label' className='cardLabel'>{card.data.label}</label>
    </div>
  );
};
export default Card;

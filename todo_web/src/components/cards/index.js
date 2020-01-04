import React from 'react';
import Task from '../tasks/index';
import './styles.css';

const Card = (card) => {
  return (
    <div className='card'>
      <h1 className='title'>{card.data.title}</h1>
      {
        card.data.task.map((task, index) => (
          <Task key={index} data={task}/>
        ))
      }
      <label htmlFor='label' className='cardLabel'>{card.data.label}</label>
    </div>
  );
};
export default Card;

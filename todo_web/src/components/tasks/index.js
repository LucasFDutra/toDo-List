import React from 'react';
import './styles.css';

const Task = () => (
  <div className='task'>
    <input className='taskCheck' type='checkbox' />
    <input className='taskText' type='text' />
    <button className='moreOneTask'>+</button>
  </div>
);

export default Task;

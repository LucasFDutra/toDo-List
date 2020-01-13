import React, { useState, useEffect } from 'react';
import './styles.css';

const Task = () => (
  <div className='card_task'>
    <input className='card_taskCheck' type='checkbox' />
    <input className='card_taskText' type='text' />
    <button className='card_deleteTask'>x</button>
  </div>
);

export default Task;

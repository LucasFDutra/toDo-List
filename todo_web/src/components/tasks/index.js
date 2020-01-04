import React from 'react';
import './styles.css';

const Task = (task) => (
  <div className='task'>
    <input className='taskCheck' type='checkbox' checked={task.data[1] === 'true'? true : false} />
    <input className='taskText' type='text' value={task.data[0]}/>
    <button className='moreOneTask'>+</button>
  </div>
);

export default Task;

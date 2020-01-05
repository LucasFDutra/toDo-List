import React, { useState, useEffect } from 'react';
import './styles.css';

const Card = (card) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(card.data.task);
  }, []);

  const taskChecked = () => {
    // setTasks([task[0], !task[1]])
  }

  const taskText = (_taskText) => {
    // setTask([_taskText, task[1]])
  }

  return (
    <div className='card'>
      <h1 className='title'>{card.data.title}</h1>
      {
        tasks.map((task, index) => (
          <div className='task'>
            <input className='taskCheck' type='checkbox' onChange={() => taskChecked()} checked={task[1]} />
            <input className='taskText' type='text' onChange={(event) => taskText(event.target.value)} value={task[0]}/>
            <button className='moreOneTask'>+</button>
          </div>

        ))
      }
      <label htmlFor='label' className='cardLabel'>{card.data.label}</label>
    </div>
  );
};

export default Card;

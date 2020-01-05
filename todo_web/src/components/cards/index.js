import React, { useState, useEffect } from 'react';
import './styles.css';

const Card = (card) => {
  const [tasks, setTasks] = useState([]);
  const [cardTitle, setCardTitle] = useState('');
  const [cardLabel, setCardLabel] = useState('');

  useEffect(() => {
    let arrayTasks = []
    card.data.task.map((task) => {
      arrayTasks = [...arrayTasks, [task[0], task[1] === 'true'? true : false]]
    })
    setTasks(arrayTasks);
    setCardTitle(card.data.title);
    setCardLabel(card.data.label);
  }, []);

  useEffect(() => {
    //mandar para o banco de dados
  }, [tasks, cardTitle, cardLabel]);

  const taskChecked = (index) => {
    let arrayTasks = []
    tasks.map((task, _index) => {
      if (_index === index){
        task[1] = !task[1];
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    })
    setTasks(arrayTasks);
  }

  const taskText = (_taskText, index) => {
    let arrayTasks = []
    tasks.map((task, _index) => {
      if (_index === index){
        task[0] = _taskText;
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    })
    setTasks(arrayTasks);
  }

  return (
    <div className='card'>
      <input className='title' onChange={(event) => setCardTitle(event.target.value)} value={cardTitle}/>
      {
        tasks.map((task, index) => (
          <div className='task' key={index}>
            <input className='taskCheck' type='checkbox' onChange={() => taskChecked(index)} checked={task[1]} />
            <input className='taskText' type='text' onChange={(event) => taskText(event.target.value, index)} value={task[0]}/>
            <button className='moreOneTask'>+</button>
          </div>
        ))
      }
      <input type='text' className='cardLabel' onChange={(event) => setCardLabel(event.target.value)} value={cardLabel}/>
    </div>
  );
};

export default Card;

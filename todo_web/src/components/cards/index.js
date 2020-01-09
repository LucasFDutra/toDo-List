import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

// viriables init with card_

const Card = ({ data }) => {
  const [card_title, setCard_Title] = useState('');
  const [card_tasks, setCard_Tasks] = useState([]);
  const [card_label, setCard_Label] = useState('');

  useEffect(() => {
    let arrayTasks = [];
    data.card.tasks.map((task) => {
      arrayTasks = [...arrayTasks, [task[0], task[1] === 'true']];
    });

    setCard_Tasks(arrayTasks);
    setCard_Title(data.card.title);
    setCard_Label(data.card.label);
  }, []);

  const card_updateCard = async () => {
    const { _id } = data.card;
    await api.put(`/card/updateCard/${_id}`, {
      validationInfo: {
        username: data.username,
        password: data.password,
      },
      data: {
        username: data.username,
        label: card_label,
        title: card_title,
        tasks: card_tasks,
      },
    });
  };

  const card_taskChecked = (index) => {
    let arrayTasks = [];
    arrayTasks = [...card_tasks];
    arrayTasks[index][1] = !arrayTasks[index][1];
    setCard_Tasks(arrayTasks);
  };

  const card_taskText = (_taskText, index) => {
    let arrayTasks = [];
    arrayTasks = [...card_tasks];
    arrayTasks[index][0] = _taskText;
    setCard_Tasks(arrayTasks);
  };

  const card_addNewTask = (index) => {
    const newArrayTask = ['', false];
    const arrayTasks = [...card_tasks];
    arrayTasks.splice(index + 1, 0, newArrayTask);
    setCard_Tasks(arrayTasks);
  };

  const card_deleteTask = (index) => {
    let arrayTasks = [];
    arrayTasks = [...card_tasks];
    arrayTasks.splice(index, 1);
    if (arrayTasks.length === 0) {
      arrayTasks = [...arrayTasks, ['', false]];
    }
    setCard_Tasks(arrayTasks);
  };

  const card_deleteCard = async () => {
    const { _id } = data.card;
    await api.delete(`/card/deleteCard/${_id}`, {
      headers: {
        username: data.username,
        password: data.password,
      },
    });
    data.dashboard_loadCards();
  };

  return (
    <div className='card_container'>
      <input className='card_title' onChange={(event) => setCard_Title(event.target.value)} value={card_title} />
      {
        card_tasks.map((task, index) => (
          <div className='card_task' key={index}>
            <input className='card_taskCheck' type='checkbox' onChange={() => card_taskChecked(index)} checked={task[1]} />
            <input className='card_taskText' type='text' onChange={(event) => card_taskText(event.target.value, index)} value={task[0]} onKeyPress={(event) => (event.key === 'Enter' ? card_addNewTask(index) : null)} />
            <button className='card_deleteTask' onClick={() => { card_deleteTask(index); }}>x</button>
          </div>
        ))
      }
      <div className='card_footer'>
        <input type='text' className='card_label' onChange={(event) => setCard_Label(event.target.value)} value={card_label} placeholder='Card Label' />
        <button className='card_updateCardButton' onClick={() => card_updateCard()}>Save</button>
        <button className='card_deleteCardButton' onClick={() => card_deleteCard()}>Delete Card</button>
      </div>
    </div>
  );
};

export default Card;

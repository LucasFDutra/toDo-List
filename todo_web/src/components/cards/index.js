import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

// viriables init with card_

const Card = ({ data }) => {
  const [card_title, setCard_Title] = useState('');
  const [card_tasks, setCard_Tasks] = useState([]);
  const [card_newTask, setCard_NewTask] = useState(['', false]);
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
    card_tasks.map((task, _index) => {
      if (_index === index) {
        task[1] = !task[1];
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setCard_Tasks(arrayTasks);
  };

  const card_taskText = (_taskText, index) => {
    let arrayTasks = [];
    card_tasks.map((task, _index) => {
      if (_index === index) {
        task[0] = _taskText;
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setCard_Tasks(arrayTasks);
  };

  const card_addNewTask = () => {
    setCard_Tasks([...card_tasks, card_newTask]);

    const arrayTask = ['', false];

    setCard_NewTask(arrayTask);
  };

  return (
    <div className='card_container'>
      <input className='card_title' onChange={(event) => setCard_Title(event.target.value)} value={card_title} />
      {
        card_tasks.map((task, index) => (
          <div className='card_task' key={index}>
            <input className='card_taskCheck' type='checkbox' onChange={() => card_taskChecked(index)} checked={task[1]} />
            <input className='card_taskText' type='text' onChange={(event) => card_taskText(event.target.value, index)} value={task[0]} />
          </div>
        ))
      }
      <div className='card_task'>
        <input className='card_taskCheck' type='checkbox' onChange={() => setCard_NewTask([card_newTask[0], !card_newTask[1]])} checked={card_newTask[1]} />
        <input className='card_taskText' type='text' onChange={(event) => setCard_NewTask([event.target.value, card_newTask[1]])} onKeyPress={(event) => (event.key === 'Enter' ? card_addNewTask() : null)} value={card_newTask[0]} />
      </div>
      <div className='card_footer'>
        <input type='text' className='card_label' onChange={(event) => setCard_Label(event.target.value)} value={card_label} />
        <button className='card_updateCardButton' onClick={() => card_updateCard()}>Update Card</button>
      </div>
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

// variables init with newCard_

const NewCard = ({ data }) => {
  const [newCard_title, setNewCard_Title] = useState('');
  const [newCard_tasks, setNewCard_Tasks] = useState([]);
  const [newCard_task, setNewCard_Task] = useState(['', false]);
  const [newCard_label, setNewCard_Label] = useState('');

  const newCard_taskChecked = (index) => {
    let arrayTasks = [];
    newCard_tasks.map((task, _index) => {
      if (_index === index) {
        task[1] = !task[1];
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setNewCard_Tasks(arrayTasks);
  };

  const newCard_taskText = (_taskText, index) => {
    let arrayTasks = [];
    newCard_tasks.map((task, _index) => {
      if (_index === index) {
        task[0] = _taskText;
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setNewCard_Tasks(arrayTasks);
  };

  const newCard_addNewTask = () => {
    setNewCard_Tasks([...newCard_tasks, newCard_task]);
    const arrayTask = ['', false];
    setNewCard_Task(arrayTask);
  };

  const newCard_addNewCard = async () => {
    await api.post('/card/createNewCard', {
      validationInfo: {
        username: data.username,
        password: data.password,
      },
      data: {
        username: data.username,
        label: newCard_label,
        title: newCard_title,
        tasks: newCard_tasks,
      },
    });
    newCard_exitScreen();
  };

  const newCard_exitScreen = () => {
    data.setDashboard_AddNewCardState(false);
    data.dashboard_loadCards();
  };

  return (
    <div tabIndex='0' className='newCard_container' onKeyDown={(event) => (event.key === 'Escape' ? newCard_exitScreen() : null)}>
      <div className='newCard_cardContainer'>
        <input className='newCard_title' placeholder='Card Title' onChange={(event) => setNewCard_Title(event.target.value)} value={newCard_title} />
        {
          newCard_tasks.map((task, index) => (
            <div className='newCard_task' key={index}>
              <input className='newCard_taskCheck' type='checkbox' onChange={() => newCard_taskChecked(index)} checked={task[1]} />
              <input className='newCard_taskText' type='text' onChange={(event) => newCard_taskText(event.target.value, index)} value={task[0]} />
            </div>
          ))
        }

        <div className='newCard_task'>
          <input className='newCard_taskCheck' type='checkbox' onChange={() => setNewCard_Task([newCard_task[0], !newCard_task[1]])} checked={newCard_task[1]} />
          <input className='newCard_taskText' type='text' onChange={(event) => setNewCard_Task([event.target.value, newCard_task[1]])} onKeyPress={(event) => (event.key === 'Enter' ? newCard_addNewTask() : null)} value={newCard_task[0]} />
        </div>
        <div className='newCard_footer'>
          <input type='text' className='newCard_label' placeholder='Card Label' onChange={(event) => setNewCard_Label(event.target.value)} value={newCard_label} />
          <button className='newCard_createCardButton' onClick={() => newCard_addNewCard()}>Create Card</button>
        </div>
      </div>
    </div>
  );
};
export default NewCard;

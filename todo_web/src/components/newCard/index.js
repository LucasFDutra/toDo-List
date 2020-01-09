import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

// variables init with newCard_

const NewCard = ({ data }) => {
  const [newCard_title, setNewCard_Title] = useState('');
  const [newCard_tasks, setNewCard_Tasks] = useState([['', false]]);
  const [newCard_label, setNewCard_Label] = useState();

  const newCard_taskChecked = (index) => {
    let arrayTasks = [];
    arrayTasks = [...newCard_tasks];
    arrayTasks[index][1] = !arrayTasks[index][1];
    setNewCard_Tasks(arrayTasks);
  };

  const newCard_taskText = (_taskText, index) => {
    let arrayTasks = [];
    arrayTasks = [...newCard_tasks];
    arrayTasks[index][0] = _taskText;
    setNewCard_Tasks(arrayTasks);
  };

  const newCard_addNewTask = (index) => {
    const newArrayTask = ['', false];
    const arrayTasks = [...newCard_tasks];
    arrayTasks.splice(index + 1, 0, newArrayTask);
    setNewCard_Tasks(arrayTasks);
  };

  const newCard_deleteTask = (index) => {
    let arrayTasks = [];
    arrayTasks = [...newCard_tasks];
    arrayTasks.splice(index, 1);
    if (arrayTasks.length === 0) {
      arrayTasks = [...arrayTasks, ['', false]];
    }
    setNewCard_Tasks(arrayTasks);
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
              <input car className='newCard_taskText' type='text' onChange={(event) => newCard_taskText(event.target.value, index)} value={task[0]} onKeyPress={(event) => (event.key === 'Enter' ? newCard_addNewTask(index) : null)} />
              <button className='newCard_deleteTask' onClick={() => { newCard_deleteTask(index); }}>x</button>
            </div>
          ))
        }
        <div className='newCard_footer'>
          <div className='newCard_labelContainer'>
            <input type='text' className='newCard_label' onChange={(event) => setNewCard_Label(event.target.value)} value={newCard_label} placeholder='Card Label' />
          </div>
          <button className='newCard_createCardButton' onClick={() => newCard_addNewCard()}>Create Card</button>
        </div>
      </div>
    </div>
  );
};
export default NewCard;

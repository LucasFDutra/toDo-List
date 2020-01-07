import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

const NewCard = ({ data }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(['', false]);
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState(data.username);
  const [password, setPassword] = useState(data.password);

  const addTask = () => {
    setTasks([...tasks, task]);

    const arrayTask = ['', false];

    setTask(arrayTask);
  };

  const taskChecked = (index) => {
    let arrayTasks = [];
    tasks.map((oneTask, _index) => {
      if (_index === index) {
        oneTask[1] = !oneTask[1];
      }
      arrayTasks = [...arrayTasks, [oneTask[0], oneTask[1]]];
    });
    setTasks(arrayTasks);
  };

  const taskText = (_taskText, index) => {
    let arrayTasks = [];
    tasks.map((oneTask, _index) => {
      if (_index === index) {
        oneTask[0] = _taskText;
      }
      arrayTasks = [...arrayTasks, [oneTask[0], oneTask[1]]];
    });
    setTasks(arrayTasks);
  };

  const addNewCard = async () => {
    await api.post('/card/createNewCard', {
      validationInfo: {
        username,
        password,
      },
      data: {
        username,
        label,
        title,
        tasks,
      },
    });
    pressEsc();
  };

  const pressEsc = () => {
    data.setAddNewCard(false);
    data.loadCards();
  };

  return (
    <div tabIndex='0' className='newCardScreen' onKeyDown={(event) => (event.key === 'Escape' ? pressEsc() : null)}>
      <div className='card'>
        <input className='title' placeholder='Card Title' onChange={(event) => setTitle(event.target.value)} value={title} />

        {
          tasks.map((oneTask, index) => (
            <div className='task' key={index}>
              <input className='taskCheck' type='checkbox' onChange={() => taskChecked(index)} checked={oneTask[1]} />
              <input className='taskText' type='text' onChange={(event) => taskText(event.target.value, index)} value={oneTask[0]} />
            </div>
          ))
        }

        <div className='task'>
          <input className='taskCheck' type='checkbox' onChange={() => setTask([task[0], !task[1]])} checked={task[1]} />
          <input className='taskText' type='text' onChange={(event) => setTask([event.target.value, task[1]])} onKeyPress={(event) => (event.key === 'Enter' ? addTask() : null)} value={task[0]} />
        </div>
        <div className='footer'>
          <input type='text' className='cardLabel' placeholder='Card Label' onChange={(event) => setLabel(event.target.value)} value={label} />
          <button className='createNewCardButton' onClick={() => addNewCard()}>Create Card</button>
        </div>
      </div>
    </div>
  );
};
export default NewCard;

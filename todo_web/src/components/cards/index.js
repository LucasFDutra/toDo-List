import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

const Card = ({ data }) => {
  const [tasks, setTasks] = useState([]);
  const [cardTitle, setCardTitle] = useState('');
  const [cardLabel, setCardLabel] = useState('');
  const [newTasks, setNewTasks] = useState([]);
  const [newTask, setNewTask] = useState(['', false]);


  useEffect(() => {
    let arrayTasks = [];
    data.card.tasks.map((task) => {
      arrayTasks = [...arrayTasks, [task[0], task[1] === 'true']];
    });
    setTasks(arrayTasks);
    setCardTitle(data.card.title);
    setCardLabel(data.card.label);
  }, []);

  const updateCard = async () => {
    const { _id } = data.card;
    await api.put(`/card/updateCard/${_id}`, {
      validationInfo: {
        username: data.username,
        password: data.password,
      },
      data: {
        username: data.username,
        label: cardLabel,
        title: cardTitle,
        tasks,
      },
    });
  };

  const taskChecked = (index) => {
    let arrayTasks = [];
    tasks.map((task, _index) => {
      if (_index === index) {
        task[1] = !task[1];
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setTasks(arrayTasks);
  };

  const taskText = (_taskText, index) => {
    let arrayTasks = [];
    tasks.map((task, _index) => {
      if (_index === index) {
        task[0] = _taskText;
      }
      arrayTasks = [...arrayTasks, [task[0], task[1]]];
    });
    setTasks(arrayTasks);
  };

  const addTask = () => {
    // setNewTasks([...newTasks, newTask]);

    setTasks([...tasks, newTask]);

    const arrayTask = ['', false];

    setNewTask(arrayTask);
  };

  return (
    <div className='card'>
      <input className='title' onChange={(event) => setCardTitle(event.target.value)} value={cardTitle} />
      {
        tasks.map((task, index) => (
          <div className='task' key={index}>
            <input className='taskCheck' type='checkbox' onChange={() => taskChecked(index)} checked={task[1]} />
            <input className='taskText' type='text' onChange={(event) => taskText(event.target.value, index)} value={task[0]} />
          </div>
        ))
      }
      <div className='task'>
        <input className='taskCheck' type='checkbox' onChange={() => setNewTask([newTask[0], !newTask[1]])} checked={newTask[1]} />
        <input className='taskText' type='text' onChange={(event) => setNewTask([event.target.value, newTask[1]])} onKeyPress={(event) => (event.key === 'Enter' ? addTask() : null)} value={newTask[0]} />
      </div>
      <div className='footer'>
        <input type='text' className='cardLabel' onChange={(event) => setCardLabel(event.target.value)} value={cardLabel} />
        <button className='createNewCardButton' onClick={() => updateCard()}>Update Card</button>
      </div>
    </div>
  );
};

export default Card;

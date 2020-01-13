import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import HiddenIcon from '../../assets/hiddenIcon.svg';
import ShowIcon from '../../assets/showIcon.svg';
import './styles.css';
import Task from '../tasks/index';
import CardFooter from '../cardFooter/index';
import CardHeader from '../cardHeader/index';

// viriables init with card_

const Card = ({ data }) => {
  const [card_title, setCard_Title] = useState(data.card.title);
  const [card_pinned, setCard_Pinned] = useState(data.card.pinned);
  const [card_tasks, setCard_Tasks] = useState([]);
  const [card_label, setCard_Label] = useState(data.card.label);
  const [card_showLabel, setCard_ShowLabel] = useState(false);
  const [card_menuCardState, setCard_MenuCardState] = useState(false);
  const [card_hiddeCompletedItems, setCard_HiddeCompletedItems] = useState(true);

  useEffect(() => {
    let arrayTasks = [];
    data.card.tasks.map((task) => {
      arrayTasks = [...arrayTasks, [task[0], task[1] === 'true']];
    });
    setCard_Tasks(arrayTasks);
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
        title: card_title,
        pinned: card_pinned,
        tasks: card_tasks,
        label: card_label,
      },
    });
    data.dashboard_loadCards();
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
      <CardHeader />
      <div className='card_tasksContainer'>
        <Task />
        <div className='card_completedItemsLabelContainer'>
          <label htmlFor='completed itens' className='card_completedItemsLabel'>Completed Items</label>
          <button className='card_completedItemsLabelButton' onClick={() => setCard_HiddeCompletedItems(!card_hiddeCompletedItems)}>
            <img src={(card_hiddeCompletedItems ? ShowIcon : HiddenIcon)} alt='completed items' className='card_completedItemsLabelButtonIcon' />
          </button>
        </div>
        <Task />
      </div>
      <CardFooter />
    </div>
  );
};

export default Card;

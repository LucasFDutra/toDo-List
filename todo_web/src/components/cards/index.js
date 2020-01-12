import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PinnedIcon from '../../assets/pinnedIcon.svg';
import MenuCardIcon from '../../assets/menuCardIcon.svg';
import HiddenIcon from '../../assets/hiddenIcon.svg';
import ShowIcon from '../../assets/showIcon.svg';
import './styles.css';

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
      <div className='card_headerContainer'>
        <input className='card_title' onChange={(event) => setCard_Title(event.target.value)} value={card_title} />
        <button className='card_pinnedCard' style={{ opacity: (card_pinned ? 1 : null) }} onClick={() => setCard_Pinned(!card_pinned)}>
          <img src={PinnedIcon} alt='pinned icon' className='card_pinnedCardIcon' />
        </button>
      </div>
      <div className='card_tasksContainer'>
        {
          card_tasks.map((task, index) => (
            !task[1] ? (
              <div className='card_task' key={index}>
                <input className='card_taskCheck' type='checkbox' onChange={() => card_taskChecked(index)} checked={task[1]} />
                <input autoFocus={(task[0] === '')} className='card_taskText' type='text' onChange={(event) => card_taskText(event.target.value, index)} value={task[0]} onKeyDown={(event) => (event.key === 'Enter' ? card_addNewTask(index) : ((event.key === 'Backspace' && (task[0].length === 1 || !task[0])) ? card_deleteTask(index) : null))} />
                <button className='card_deleteTask' onClick={() => { card_deleteTask(index); }}>x</button>
              </div>
            ) : null
          ))
        }
        <div className='card_completedItemsLabelContainer'>
          <label htmlFor='completed itens' className='card_completedItemsLabel'>Completed Items</label>
          <button className='card_completedItemsLabelButton' onClick={() => setCard_HiddeCompletedItems(!card_hiddeCompletedItems)}>
            <img src={(card_hiddeCompletedItems ? ShowIcon : HiddenIcon)} alt='completed items' className='card_completedItemsLabelButtonIcon' />
          </button>
        </div>
        {
          !card_hiddeCompletedItems && (
            card_tasks.map((task, index) => (
              task[1] ? (
                <div className='card_task' key={index}>
                  <input className='card_taskCheck' type='checkbox' onChange={() => card_taskChecked(index)} checked={task[1]} />
                  <input className='card_taskText' type='text' onChange={(event) => card_taskText(event.target.value, index)} value={task[0]} onKeyDown={(event) => ((event.key === 'Backspace' && (task[0].length === 1 || !task[0])) ? card_deleteTask(index) : null)} />
                  <button className='card_deleteTask' onClick={() => { card_deleteTask(index); }}>x</button>
                </div>
              ) : null
            ))
          )
        }
      </div>
      <div className='card_footer'>
        <div>
          {
          (card_label || card_showLabel) && (
            <div className='card_labelContainer'>
              <input type='text' className='card_label' onChange={(event) => { setCard_Label(event.target.value); }} onKeyDown={(event) => ((event.key === 'Backspace' && (card_label.length === 1 || !card_label)) ? setCard_ShowLabel(false) : null)} value={card_label} size={(card_label ? card_label.length : 3)} />
            </div>
          )
        }
        </div>
        <div className='card_footerButtons'>
          {
            card_menuCardState && (
              <>
                {
                  (!card_label && !card_showLabel) && (
                    <button className='card_labelButton' onClick={() => { setCard_ShowLabel(true); }}>Add Label</button>
                  )
                }
                <button className='card_deleteCardButton' onClick={() => card_deleteCard()}>Delete Card</button>
              </>
            )
          }
          <button className='card_updateCardButton' onClick={() => card_updateCard()}>Update</button>
          <button className='card_menuCard' onClick={() => { setCard_MenuCardState(!card_menuCardState); }}>
            <img src={MenuCardIcon} alt='menu card icon' className='card_menuCardIcon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

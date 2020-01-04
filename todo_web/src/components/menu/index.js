import React, { useState, useEffect } from 'react';
import Label from '../labels/index';
import './styles.css';

const Menu = (cards) => {
  const [cardsLabels, setCardLabels] = useState([]);

  useEffect(()=>{
    let arrayLabels = []
    cards.data.map((card) => (
      arrayLabels = [...arrayLabels, card.label]
    ))
    setCardLabels([...new Set(arrayLabels)])
  }, [])

  return (
    <div className='menu'>
      <label htmlFor='label'>Labels</label>
      {
        cardsLabels.map((cardLabel, index) => (
          <Label key={index} data={cardLabel}/>
        ))
      }
    </div>
  );
  }
export default Menu;

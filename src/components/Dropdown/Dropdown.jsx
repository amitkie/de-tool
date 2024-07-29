import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`dropdown ${isActive ? 'is-active' : ''}`} onClick={() => setIsActive(!isActive)}>
      <button className="dropdown-toggle">Dropdown</button>
      <div className="dropdown-menu">
        {options.map(option => (
          <div className="dropdown-item" key={option}>{option}</div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

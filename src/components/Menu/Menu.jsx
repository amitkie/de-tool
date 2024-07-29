import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <nav className="menu">
      {['Home', 'About', 'Contact'].map(link => (
        <div
          key={link}
          className={`menu-link ${activeLink === link ? 'is-active' : ''}`}
          onClick={() => setActiveLink(link)}
        >
          {link}
        </div>
      ))}
    </nav>
  );
};

export default Menu;

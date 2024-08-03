import React from 'react';
import './Cards.css';
import { Api, Functions, IntegrationInstructions } from '@mui/icons-material';

const Cards = ({ title, description, imgSrc, link, tabName, onClick, onAutomateClick, paymentStatus }) => {
  return (
    <div className="card" onClick={(e) => {
      e.preventDefault();
      onClick(tabName, link);
    }}>
      <div className="cardHeading">
        <img className="imgStyle" src={imgSrc} alt={title} />
        <h2 className="card__heading">{title}</h2>
      </div>
      {/* <p className="card__description">{description}</p> */}
      {paymentStatus === 'Completed' && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAutomateClick(tabName);
          }}
          className="save-button btn"
        >
          Automate Flow
        </button>
      )}
    </div>
  );
};

export default Cards;

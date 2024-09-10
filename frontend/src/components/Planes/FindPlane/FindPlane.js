// FindPlane.js
import React from 'react';
import PropTypes from 'prop-types';
import "./FindPlane.css";

function FindPlane({ onCategorySelect }) {
  return (
    <div className="header-menu">
      <div className="plane-class">
        <a className="plane-link" onClick={() => onCategorySelect("passenger")}>Пассажирские</a>
        <a className="plane-link" onClick={() => onCategorySelect("treasure")}>Истребители</a>
        <a className="plane-link" onClick={() => onCategorySelect("sport")}>Спортивные</a>
        <a className="plane-link" onClick={() => onCategorySelect("train")}>Учебно-тренировочные</a>
      </div>
    </div>
  );
}

FindPlane.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default FindPlane;

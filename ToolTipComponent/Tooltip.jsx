import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css'; 

export const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};
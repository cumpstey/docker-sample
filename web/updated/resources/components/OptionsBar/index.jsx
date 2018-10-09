import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const OptionsBar = props =>
  <div className="options-bar">
    {props.children}
  </div>;

OptionsBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default OptionsBar;

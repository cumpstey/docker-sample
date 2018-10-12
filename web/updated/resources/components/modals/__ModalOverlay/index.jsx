import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalOverlay = ({ children }) =>
  <div className="modal-overlay">
    {children}
  </div>;

ModalOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default ModalOverlay;

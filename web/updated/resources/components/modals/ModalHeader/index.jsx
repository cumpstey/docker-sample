import React from 'react';
import PropTypes from 'prop-types';
import Svg from '../../Svg';
import './style.css';

const ModalHeader = ({ title, handleCloseClick }) =>
  <div className="modal-header">
    <div className="modal-header-title">{title}</div>
    <div className="modal-header-close" onClick={handleCloseClick} role="button">
      <Svg name="close" />
    </div>
  </div>;

ModalHeader.propTypes = {
  title: PropTypes.string,
  handleCloseClick: PropTypes.func,
};

export default ModalHeader;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ui';
import ModalHeader from '../ModalHeader';
import './style.css';

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCloseClick: actions.closeModal,
}, dispatch);

const ModalWindow = ({ children, className, title, handleCloseClick }) => {
  const cssClasses = classnames('modal-window', className);
  const handleModalClick = event => event.stopPropagation();

  return (
    <div className="modal-overlay">
      <div className={cssClasses} onClick={handleModalClick}>
        {title && <ModalHeader title={title} handleCloseClick={handleCloseClick} />}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  title: PropTypes.string,
  handleCloseClick: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ModalWindow);

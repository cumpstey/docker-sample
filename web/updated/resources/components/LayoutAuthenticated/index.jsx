import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import App from '../App';
import Header from '../../containers/Header';
import './style.css';

const LayoutAuthenticated = ({ className, children }) => {
  const cssClasses = classnames('layout', className);

  return (
    <div className={cssClasses}>
      <Header />
      {children}
    </div>
  );
};

LayoutAuthenticated.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

export default LayoutAuthenticated;

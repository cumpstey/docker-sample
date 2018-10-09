import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AuthBox = ({ title, children, footer }) =>
  <div className="auth-box">
    <div className="auth-box-inner">
      <div className="auth-box-header">
        <div className="auth-box-headline">{title}</div>
      </div>
      <div className="auth-box-body">
        {children}
      </div>
      <div className="auth-box-footer">
        {footer}
      </div>
    </div>
  </div>;

AuthBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
  footer: PropTypes.element,
};

export default AuthBox;

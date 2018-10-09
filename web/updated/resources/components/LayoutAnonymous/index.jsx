import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import App from '../App';
import Svg from '../Svg';
import config from '../../configuration';
import { icon } from '../../constants';
import './style.css';

const LayoutAnonymous = ({ className, children }) => {
  const cssClasses = classnames('layout-anonymous', className);
  const style = { backgroundImage: `url(${config.backgroundImageUrl})` };

  return (
    <div className={cssClasses} style={style}>
      <div className="layout-anonymous-header">
        <div className="bmw-group-logo">
          <Svg name={icon.compass} className="logo-bmw-group" />
        </div>
        <div className="brand-logos">
          <Svg name={icon.gnome2} className="logo-bmw" />
          <Svg name={icon.intertwingly} className="logo-mini" />
        </div>
      </div>
      <div className="layout-anonymous-body">
        {children}
      </div>
    </div>
  );
};

LayoutAnonymous.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

export default LayoutAnonymous;

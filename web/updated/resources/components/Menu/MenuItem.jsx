import React from 'react';
import PropTypes from 'prop-types';
import SquareIcon from '../SquareIcon';

const MenuItem = ({ icon, name, description, isActive }) =>
  <div className="menu-item-inner">
    {icon &&
      <div className="menu-item-icon">
        <SquareIcon name={icon} isDisabled={!isActive} />
      </div>
    }
    <div className="menu-item-text">
      <div className="menu-item-name">{name}</div>
      <div className="menu-item-description">{description}</div>
    </div>
  </div>;

MenuItem.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  isActive: PropTypes.bool,
};

export default MenuItem;


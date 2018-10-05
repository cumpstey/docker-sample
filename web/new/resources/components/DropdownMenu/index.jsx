import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import './style.css';

const DropdownMenu = ({ data, selectedMenuItemId, handleMenuItemClick, handleBackgroundClick }) =>
  <div className="dropdown-menu">
    <div className="dropdown-menu-background" onClick={handleBackgroundClick} />
    <Menu
      data={data}
      selectedMenuItemId={selectedMenuItemId}
      handleMenuItemClick={handleMenuItemClick}
    />
  </div>;

DropdownMenu.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  ]),
  selectedMenuItemId: PropTypes.string,
  handleMenuItemClick: PropTypes.func,
  handleBackgroundClick: PropTypes.func,
};

export default DropdownMenu;

import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import './style.css';

const DropdownMenu = ({ data, selectedMenuItemId, handleBackgroundClick }) =>
  <div className="dropdown-menu">
    <div className="dropdown-menu-background" onClick={handleBackgroundClick} />
    <Menu
      data={data}
      selectedMenuItemId={selectedMenuItemId}
    />
  </div>;

DropdownMenu.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  selectedMenuItemId: PropTypes.string,
  handleBackgroundClick: PropTypes.func,
};

export default DropdownMenu;

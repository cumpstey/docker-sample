import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from '../Link';
import MenuItem from './MenuItem';
import './style.css';

const Menu = ({ data, isDropdown, selectedMenuItemId, handleMenuItemClick }) => {
  const cssClasses = classnames('menu', {
    'menu--dropdown': isDropdown,
  });

  const getItemList = items => items.map((item) => {
    const { id, icon, name, description, path, isDownload } = item;
    const isActive = selectedMenuItemId === id;

    const menuItem = (
      <MenuItem
        key={id}
        icon={icon}
        name={name}
        path={path}
        description={description}
        isActive={isActive}
      />
    );

    return handleMenuItemClick ?
      <div className="menu-item" key={id} onClick={handleMenuItemClick(id)}>{menuItem}</div> :
      <Link to={path} key={id} isDownload={isDownload} className="menu-item">{menuItem}</Link>;
  });

  const getItem = item => (
    <div className="menu-item">
      <MenuItem
        icon={item.icon}
        name={item.name}
        path={item.path}
        description={item.description}
      />
    </div>
  );

  const items = data instanceof Array ? getItemList(data) : getItem(data);

  return (
    <div className={cssClasses}>
      {items}
    </div>
  );
};

Menu.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  ]),
  selectedMenuItemId: PropTypes.string,
  isDropdown: PropTypes.bool,
  handleMenuItemClick: PropTypes.func,
};

export default Menu;


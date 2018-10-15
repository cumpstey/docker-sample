import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from '../Link';
import MenuItem from './MenuItem';
import './style.css';

// TODO: this is a bit rubbish
const Menu = ({ data, selectedMenuItemId }) => {
  // const cssClasses = classnames('menu', {
  //   'menu--dropdown': isDropdown,
  // });

  // const getItemList = items => items.map((item) => getItem(item));

  // const getItem = item => (
  //   <div className="menu-item">
  //     <MenuItem
  //       icon={item.icon}
  //       name={item.name}
  //       path={item.path}
  //       description={item.description}
  //     />
  //   </div>
  // );

  const getItem = item => {
    const { id, icon, name, description, path, handleClick, isDownload } = item;
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

    return handleClick ? <div className="menu-item" key={id} onClick={handleClick}>{menuItem}</div>
      : path ? <Link className="menu-item" to={path} key={id} isDownload={isDownload}>{menuItem}</Link>
      : null;
  };

  const items = Array.isArray(data) ? data.map(item => getItem(item)) : getItem(data);

  return (
    <div className="menu">
      {items}
    </div>
  );
};

Menu.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  selectedMenuItemId: PropTypes.string,
  isDropdown: PropTypes.bool,
};

export default Menu;


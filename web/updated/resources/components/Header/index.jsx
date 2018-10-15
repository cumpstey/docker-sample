import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import DropdownMenu from '../../containers/DropdownMenu';
import Svg from '../Svg';
import HeaderNavigation from './HeaderNavigation';
import config from '../../configuration';
import { icon } from '../../constants';
import { getShortUserName } from '../../helpers/user';
import './style.css';

const createMenu = (props) => {
  const basic = [
    {
      id: 'settings',
      icon: icon.person,
      name: 'Account settings',
      path: config.routes.account,
      description: 'Change your account details and password',
    },
    {
      id: 'logout',
      icon: icon.logout,
      name: 'Log out',
      handleClick: props.handleLogout,
      description: 'Log out of this account',
    }
  ];

  if (props.canChangeRole) {
    basic.push({
      id: 'chooseRole',
      icon: icon.changeRole,
      name: 'Choose role',
      handleClick: props.handleChangeRole,
      description: 'View as a different role',
    });
  }

  return basic;
}

const Header = props => {
  const menu = createMenu(props);

  return <div className="header">
    <div className="header-main">
      <div className="header-mobile-menu" onClick={props.handleMobileNavIconClick}>
        <Svg name={icon.menu} />
      </div>
      <Link to={config.routes.dashboard} className="header-logo">
        <Svg name={icon.compass} className="logo" />
      </Link>
      <div className="header-nav-background" onClick={props.handleMobileNavBackgroundClick} />
      <HeaderNavigation role={props.role} />
    </div>
    <div className="header-options">
      {props.userIsLoaded &&
      <div className="header-account">
        <div className="header-account-toggle" onClick={props.openAccountMenu}>
          <div className="header-account-name">{getShortUserName(props)}</div>
          <Svg name={icon.expandMore} />
        </div>
        {props.shouldDisplayDropdown && <DropdownMenu data={menu} />}
      </div>
      }
    </div>
  </div>;
}

Header.propTypes = {
  openAccountMenu: PropTypes.func,
  handleMobileNavIconClick: PropTypes.func,
  handleMobileNavBackgroundClick: PropTypes.func,
  handleLogout: PropTypes.func,
  allowChangingRole: PropTypes.bool,
  isUserLoaded: PropTypes.bool,
  user: PropTypes.object,
  role: PropTypes.string,
};

export default Header;

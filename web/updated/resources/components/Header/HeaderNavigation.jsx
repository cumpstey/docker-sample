import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import config from '../../configuration';
import { role } from '../../constants';

const HeaderNavigation = (props) => {
  console.log(props);

  switch (props.role) {

    case role.administrator:
      return (
        <div className="header-nav">
          <Link className="header-nav-item" to={config.routes.dashboard}>Dashboard</Link>
          <Link className="header-nav-item" to={config.routes.userManagement}>User management</Link>
        </div>
      );

    case role.manager:
      return (
        <div className="header-nav">
          <Link className="header-nav-item" to={config.routes.dashboard}>Dashboard</Link>
        </div>
      );

    default:
      return (
        <div className="header-nav">
          <Link className="header-nav-item" to={config.routes.dashboard}>Dashboard</Link>
        </div>
      );
  }
};

HeaderNavigation.propTypes = {
  role: PropTypes.string,
};

export default HeaderNavigation;

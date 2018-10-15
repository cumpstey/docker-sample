import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../LayoutAuthenticated';
import RestrictByRole from '../RestrictByRole';
import { role } from '../../constants';

class UserManagementPage extends Component {

  render() {
    return <RestrictByRole restrictTo={[role.administator, role.manager]}>
        <Layout className="user-management-page">
          <h1>User management</h1>
        </Layout>
      </RestrictByRole>;
  }
}

UserManagementPage.propTypes = {
}

export default UserManagementPage;

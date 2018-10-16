import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../LayoutAuthenticated';
import RestrictByRole, { action } from '../RestrictByRole';
import { role } from '../../constants';

class UserManagementPage extends Component {

  render() {
    return <RestrictByRole restrictTo={role.administrator} action={action.error}>
        <Layout className="user-management-page">
          <h1>User management</h1>
        </Layout>
      </RestrictByRole>;
  }
}

UserManagementPage.propTypes = {
}

export default UserManagementPage;

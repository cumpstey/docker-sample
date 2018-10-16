import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../formElements/Button';
import EnhancedTable from '../tables/EnhancedTable';
import Layout from '../LayoutAuthenticated';
import RestrictByRole, { action } from '../RestrictByRole';
import { role } from '../../constants';
import './style.css';

const columns = [{
  id: 'name',
  serverId: 'lastName',
  text: 'Name',
  isSortable: true,
}, {
  id: 'email',
  serverId: 'email',
  text: 'Email',
  isSortable: true,
}, {
  id: 'role',
  text: 'Role',
  isSortable: true,
}, {
  id: 'status',
  text: 'Status',
  isSortable: false,
}, {
  id: 'action',
  text: 'Action',
  isSortable: false,
}];

const transformRows = rows => rows.map((row) => {
  const action = (
    <Button
      color="gray"
      text="Do something"
      handleClick={() => false}
      fullWidth
    />
  );

  return { ...row, action };
});

class UserManagementPage extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <RestrictByRole restrictTo={role.administrator} action={action.error}>
        <Layout className="user-management-page">
          <EnhancedTable
            id="users"
            rows={transformRows(this.props.rows)}
            columns={columns}
            isLoading={this.props.isLoading}
            primaryHeading="User management"
            secondaryHeading="This is the secondary heading"
            meta={this.props.meta}
            updateQuery={this.props.updateQuery}
          />
        </Layout>
      </RestrictByRole>
    );
  }
};

UserManagementPage.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  primaryHeading: PropTypes.string,
  secondaryHeading: PropTypes.string,
  isLoading: PropTypes.bool,
  meta: PropTypes.object,
  fetchData: PropTypes.func,
  updateQuery: PropTypes.func,
}

export default UserManagementPage;

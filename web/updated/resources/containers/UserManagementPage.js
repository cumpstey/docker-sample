import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import UserManagementPage from '../components/UserManagementPage';
import config from '../configuration';
import * as uiActions from '../actions/ui';
import * as usersActions from '../actions/users';

const mapStateToProps = state => ({
  rows: state.users.data.map(user => ({...user, name: `${user.firstName} ${user.lastName}`, role: user.roles.join("; ") })),
  isLoading: state.users.isLoading,
  meta: state.users.meta,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchData: usersActions.fetch,
  showModal: uiActions.showModal,
  push,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const query = queryString.parse(ownProps.location.search);

  return {
    ...stateProps,
    fetchData: () => dispatchProps.fetchData(query),
    updateQuery: params => {
      const updated = { ...query, ...params };
      const url = `?${queryString.stringify(updated)}`
      dispatchProps.push(url);
      dispatchProps.fetchData(updated);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserManagementPage);

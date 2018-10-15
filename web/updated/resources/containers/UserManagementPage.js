import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserManagementPage from '../components/UserManagementPage';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserManagementPage);

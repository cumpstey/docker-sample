import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/LoginPage';

const mapStateToProps = state => ({
  requireTwoFactorAuth: state.loginForm && state.loginForm.requireTwoFactorAuth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginPage);

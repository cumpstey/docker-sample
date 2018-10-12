import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/LoginPage';
import { FORM_ID } from '../configuration/forms/login';
import * as actions from '../actions/forms/login';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  requireTwoFactorAuth: state.loginForm && state.loginForm.requireTwoFactorAuth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  // requireTwoFactorAuth: ownProps.location.hash = '#two-factor',
  // f: console.log(ownProps),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginPage);
